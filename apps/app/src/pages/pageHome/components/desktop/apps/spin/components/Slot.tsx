import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import * as S from "./Slot.styles";
import { Animation, ICallbackResult } from "@src/utils/Animation";

export type ISlotState = "spin" | "stop";

interface Props {
	items: string[];
	slotState: ISlotState;
	setSlotState: Dispatch<SetStateAction<ISlotState>>;
	selectedItem: number;
}

export const Slot = ({ items, slotState, setSlotState, selectedItem }: Props) => {
	const refAnimation = useRef<Animation>(new Animation());
	const refSlotScroller = useRef<HTMLDivElement>(null);
	const slotItems = [...items, ...items, ...items];
	const itemSpinTime = 100;

	useEffect(() => {
		refAnimation.current = new Animation();
		refAnimation.current.startLoop();
		refAnimation.current.pause();

		updateSlotScroller(false);

		return () => {
			refAnimation.current.stopLoop();
		};
	}, []);

	useEffect(() => {
		if (slotState === "spin") {
			slotStarting();
		}
	}, [slotState]);

	const slotStarting = () => {
		refAnimation.current.setAnimation({
			time: itemSpinTime * 3,
			points: [[0, -100, 0]],
			timing: Animation.TIMING_EASE_IN,
			direction: Animation.DIRECTION_FORWARD,
			delay: 0,
			isCyclic: false,
			isDelayOnRepeat: false,
			repeat: 1,
			onCalculate: (_result: ICallbackResult) => {
				updateSlotScroller(false);
			},
			callbacks: [
				{
					position: itemSpinTime * 3,
					direction: Animation.DIRECTION_FORWARD,
					callback: (_result: ICallbackResult) => {
						slotSpinning();
					},
				},
			],
		});

		refAnimation.current.resume();
	};

	const slotSpinning = () => {
		refAnimation.current.setAnimation({
			time: itemSpinTime * items.length,
			points: [[0, 100 * items.length]],
			timing: Animation.TIMING_LINEAR,
			direction: Animation.DIRECTION_FORWARD,
			delay: 0,
			isCyclic: false,
			isDelayOnRepeat: false,
			repeat: 4,
			onCalculate: (_result: ICallbackResult) => {
				updateSlotScroller(true);
			},
			callbacks: [
				{
					position: itemSpinTime * items.length,
					direction: Animation.DIRECTION_FORWARD,
					callback: (_result: ICallbackResult) => {
						if (_result.repeat === 1) {
							slotSlowing();
						}
					},
				},
			],
		});

		refAnimation.current.resume();
	};

	const slotSlowing = () => {
		const extraTimeToSpin = 50 * (items.length - selectedItem);

		refAnimation.current.setAnimation({
			time: itemSpinTime * items.length + extraTimeToSpin,
			points: [[0, 0 + 100 * (items.length - selectedItem)]],
			timing: Animation.TIMING_EASE_OUT,
			direction: Animation.DIRECTION_FORWARD,
			delay: 0,
			isCyclic: false,
			isDelayOnRepeat: false,
			repeat: 1,
			onCalculate: (_result: ICallbackResult) => {
				updateSlotScroller(false);
			},
			callbacks: [
				{
					position: itemSpinTime * items.length + extraTimeToSpin,
					direction: Animation.DIRECTION_FORWARD,
					callback: (_result: ICallbackResult) => {
						refAnimation.current.pause();
						setSlotState("stop");
					},
				},
			],
		});

		refAnimation.current.resume();
	};

	const updateSlotScroller = (isBlure: boolean) => {
		if (refSlotScroller.current) {
			refSlotScroller.current.style.top = `${-100 * items.length + refAnimation.current.results[0]}%`;
			refSlotScroller.current.style.filter = isBlure ? `blur(2px)` : "blur(0px)";
		}
	};

	return (
		<S.Slot>
			<S.SlotScroller ref={refSlotScroller} $numberOfItems={items.length}>
				{slotItems.map((item, index) => (
					<S.Item key={index} $numberOfItems={items.length}>
						{item}
					</S.Item>
				))}
			</S.SlotScroller>
		</S.Slot>
	);
};
