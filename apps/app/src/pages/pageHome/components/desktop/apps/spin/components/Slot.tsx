import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import * as S from "./Slot.styles";
import { Animation, ICallbackResult } from "@src/utils/Animation";

export type ISlotState = "spin" | "stop";

interface Props {
	items: string[];
	slotState: ISlotState;
	setSlotState: Dispatch<SetStateAction<ISlotState>>;
	stopItem: number;
}

export const Slot = ({ items, stopItem, slotState, setSlotState }: Props) => {
	const refAnimation = useRef<Animation>(new Animation());
	const refSlotScroller = useRef<HTMLDivElement>(null);

	const slotItems = [...items, ...items, ...items].reverse();

	const ITEM_SPIN_TIME = 100;
	const ITEMS_BEOFRE_STOP = 2;

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
			time: ITEM_SPIN_TIME * 3,
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
					position: ITEM_SPIN_TIME * 3,
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
			time: ITEM_SPIN_TIME * items.length,
			points: [[refAnimation.current.results[0], refAnimation.current.results[0] + 100 * items.length]],
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
					position: ITEM_SPIN_TIME * items.length,
					direction: Animation.DIRECTION_FORWARD,
					callback: (_result: ICallbackResult) => {
						if (_result.repeat === 1) {
							slotWaiting();
						}
					},
				},
			],
		});

		refAnimation.current.resume();
	};

	const slotWaiting = () => {
		let itemsToKeepSpinning = stopItem - ITEMS_BEOFRE_STOP + items.length;

		while (itemsToKeepSpinning < 0) {
			itemsToKeepSpinning += items.length;
		}

		refAnimation.current.setAnimation({
			time: ITEM_SPIN_TIME * itemsToKeepSpinning,
			points: [[refAnimation.current.results[0] - 100 * items.length, refAnimation.current.results[0] - 100 * items.length + 100 * itemsToKeepSpinning]],
			timing: Animation.TIMING_LINEAR,
			direction: Animation.DIRECTION_FORWARD,
			delay: 0,
			isCyclic: false,
			isDelayOnRepeat: false,
			repeat: 1,
			onCalculate: (_result: ICallbackResult) => {
				updateSlotScroller(true);
			},
			callbacks: [
				{
					position: ITEM_SPIN_TIME * itemsToKeepSpinning,
					direction: Animation.DIRECTION_FORWARD,
					callback: (_result: ICallbackResult) => {
						slotSlowing();
					},
				},
			],
		});

		refAnimation.current.resume();
	};

	const slotSlowing = () => {
		refAnimation.current.setAnimation({
			time: ITEM_SPIN_TIME * ITEMS_BEOFRE_STOP * 2,
			points: [[refAnimation.current.results[0] - 100 * items.length, refAnimation.current.results[0] - 100 * items.length + 100 * ITEMS_BEOFRE_STOP]],
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
					position: ITEM_SPIN_TIME * ITEMS_BEOFRE_STOP * 2,
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
			refSlotScroller.current.style.top = `${-100 * (items.length + items.length - 1) + refAnimation.current.results[0]}%`;
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
