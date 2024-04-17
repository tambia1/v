import { useState } from "react";
import * as S from "./SlotMachine.styles";
import { ISlotState, Slot } from "./components/slot/Slot";
import { getRandomNumber } from "@src/utils/Random";

interface Props {
	slotItems: string[];
}

export const SlotMachine = ({ slotItems }: Props) => {
	const [slotState, setSlotState] = useState<ISlotState>("stop");
	const [spinStart, setSpinStart] = useState(0);
	const [spinEnd, setSpinEnd] = useState(0);

	const handleOnClickSpin = () => {
		if (slotState !== "spin") {
			setSlotState("spin");
			setSpinStart(spinEnd);
			setSpinEnd(getRandomNumber(0, slotItems.length - 1));
		}
	};

	return (
		<S.Spin onClick={handleOnClickSpin}>
			<S.SlotMachine>
				<S.Slot_1>
					<Slot slotState={slotState} setSlotState={setSlotState} items={slotItems} startItem={spinStart} stopItem={spinEnd} />
				</S.Slot_1>
			</S.SlotMachine>
		</S.Spin>
	);
};
