import { Animation, AnimationLooper, type CallbackResult } from "@src/utils/Animation";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import * as S from "./Slot.styles";

export type SlotState = "spin" | "stop";

type Props = {
	items: string[];
	slotState: SlotState;
	setSlotState: Dispatch<SetStateAction<SlotState>>;
	startItem: number;
	stopItem: number;
};

export const Slot = ({ items, startItem, stopItem, slotState, setSlotState }: Props) => {
	const [animation] = useState<Animation>(new Animation());
	const [animationLooper] = useState<AnimationLooper>(new AnimationLooper());

	const [slotItems, setSlotItems] = useState<string[]>([]);
	const [result, setResult] = useState<number[]>([0, 0]);

	const ITEM_SPIN_TIME = 100;

	useEffect(() => {
		let newSlotItems: string[] = [...items];

		while (newSlotItems.length < 20) {
			newSlotItems = [...newSlotItems, ...items];
		}

		newSlotItems = [...newSlotItems, ...items];

		newSlotItems = newSlotItems.reverse();
		setSlotItems(newSlotItems);

		animation.setAnimation({
			time: ITEM_SPIN_TIME * (newSlotItems.length + stopItem - startItem),
			routes: [
				[startItem, newSlotItems.length - items.length + stopItem],
				[0, 5, 0],
			],
			timing: [0, -10, 50, 110, 100],
			onCalculate: (result: CallbackResult) => {
				setResult(() => [result.results[0], result.results[1]]);
			},
			callbacks: [
				{
					position: ITEM_SPIN_TIME * (newSlotItems.length + stopItem - startItem),
					callback: (_result: CallbackResult) => {
						animation.pause();
						animationLooper.stopLoop();
						setSlotState("stop");
					},
				},
			],
		});

		animation.reset();
		animationLooper.setAnimations([animation]);

		return () => {
			animation.pause();
			animationLooper.stopLoop();
		};
	}, [startItem, stopItem, animation, animationLooper, items, setSlotState]);

	useEffect(() => {
		if (slotState === "spin") {
			animation.reset();
			animation.resume();
			animationLooper.startLoop();
		}
	}, [slotState, animation, animationLooper]);

	return (
		<S.Slot>
			<S.SlotScroller
				$numberOfItems={slotItems.length}
				style={{
					top: `${-100 * (slotItems.length - 1) + 100 * result[0]}%`,
					filter: `blur(${result[1]}px)`,
				}}
			>
				{slotItems.map((item, index) => (
					<S.Item key={index} $numberOfItems={slotItems.length}>
						{item}
					</S.Item>
				))}
			</S.SlotScroller>
		</S.Slot>
	);
};
