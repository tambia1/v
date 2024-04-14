import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import * as S from "./Slot.styles";
import { Animation, ICallbackResult } from "@src/utils/Animation";

export type ISlotState = "spin" | "stop";

interface Props {
	items: string[];
	slotState: ISlotState;
	setSlotState: Dispatch<SetStateAction<ISlotState>>;
	startItem: number;
	stopItem: number;
}

export const Slot = ({ items, startItem, stopItem, slotState, setSlotState }: Props) => {
	const refAnimation = useRef<Animation>(new Animation());
	const refSlotScroller = useRef<HTMLDivElement>(null);

	const slotItems = [...items, ...items].reverse();

	const ITEM_SPIN_TIME = 100;

	useEffect(() => {
		refAnimation.current = new Animation({
			time: ITEM_SPIN_TIME * (items.length + stopItem - startItem),
			points: [[startItem, items.length + stopItem]],
			timing: Animation.TIMING_LINEAR,
			direction: Animation.DIRECTION_FORWARD,
			delay: 0,
			isCyclic: false,
			isDelayOnRepeat: false,
			repeat: 1,
			onCalculate: (_result: ICallbackResult) => {
				updateSlotScroller(0);
			},
			callbacks: [
				{
					position: ITEM_SPIN_TIME * (items.length + stopItem - startItem),
					direction: Animation.DIRECTION_FORWARD,
					callback: (_result: ICallbackResult) => {
						if (_result.repeat === 1) {
							refAnimation.current.pause();
							setSlotState("stop");
						}
					},
				},
			],
		});

		// refAnimation.current.startLoop();
		refAnimation.current.pause();

		return () => {
			// refAnimation.current.stopLoop();
		};
	}, []);

	useEffect(() => {
		if (slotState === "spin") {
			refAnimation.current.reset();
			refAnimation.current.resume();
		}
	}, [slotState]);

	const updateSlotScroller = (blur: number) => {
		if (refSlotScroller.current) {
			refSlotScroller.current.style.top = `${100 * refAnimation.current.results[0] - 100 * (items.length + items.length - 1)}%`;
			refSlotScroller.current.style.filter = `blur(${blur}px)`;
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
