import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import * as S from "./Slot.styles";
import { Animation, AnimationLooper, ICallbackResult } from "@src/utils/Animation";

export type ISlotState = "spin" | "stop";

interface Props {
	items: string[];
	slotState: ISlotState;
	setSlotState: Dispatch<SetStateAction<ISlotState>>;
	startItem: number;
	stopItem: number;
}

export const Slot = ({ items, startItem, stopItem, slotState, setSlotState }: Props) => {
	const [animationTop] = useState<Animation>(new Animation());
	const [animationBlur] = useState<Animation>(new Animation());
	const [animationLooper] = useState<AnimationLooper>(new AnimationLooper());

	const refSlotScroller = useRef<HTMLDivElement>(null);

	const slotItems = [...items, ...items].reverse();

	const ITEM_SPIN_TIME = 100;

	useEffect(() => {
		animationTop.setAnimation({
			time: ITEM_SPIN_TIME * (items.length + stopItem - startItem),
			points: [[startItem, items.length + stopItem]],
			timing: Animation.TIMING_LINEAR,
			direction: Animation.DIRECTION_FORWARD,
			delay: 0,
			isCyclic: false,
			isDelayOnRepeat: false,
			repeat: Math.ceil(10 / items.length),
			onCalculate: (_result: ICallbackResult) => {
				updateTop();
			},
			callbacks: [
				{
					position: ITEM_SPIN_TIME * (items.length + stopItem - startItem),
					direction: Animation.DIRECTION_FORWARD,
					callback: (_result: ICallbackResult) => {
						if (_result.repeat === 1) {
							animationTop.pause();
							setSlotState("stop");
						}
					},
				},
			],
		});

		animationBlur.setAnimation({
			time: ITEM_SPIN_TIME * (items.length + stopItem - startItem + Math.ceil(10 / items.length)),
			points: [[0, 7, 0]],
			timing: Animation.TIMING_EASE,
			direction: Animation.DIRECTION_FORWARD,
			delay: 0,
			isCyclic: false,
			isDelayOnRepeat: false,
			repeat: 1,
			onCalculate: (_result: ICallbackResult) => {
				updateBlur();
			},
			callbacks: [
				{
					position: ITEM_SPIN_TIME * (items.length + stopItem - startItem + Math.ceil(10 / items.length)),
					direction: Animation.DIRECTION_FORWARD,
					callback: (_result: ICallbackResult) => {
						if (_result.repeat === 1) {
							animationBlur.pause();
						}
					},
				},
			],
		});

		animationLooper.setAnimations([animationTop, animationBlur]);
		animationLooper.startLoop();

		return () => {
			animationLooper.stopLoop();
		};
	}, []);

	useEffect(() => {
		if (slotState === "spin") {
			animationTop.reset();
			animationTop.resume();
			animationBlur.reset();
			animationBlur.resume();
		}
	}, [slotState]);

	const updateTop = () => {
		if (refSlotScroller.current) {
			refSlotScroller.current.style.top = `${100 * animationTop.results[0] - 100 * (items.length + items.length - 1)}%`;
		}
	};

	const updateBlur = () => {
		console.log("blur", animationBlur.results[0]);

		if (refSlotScroller.current) {
			refSlotScroller.current.style.filter = `blur(${animationBlur.results[0]}px)`;
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
