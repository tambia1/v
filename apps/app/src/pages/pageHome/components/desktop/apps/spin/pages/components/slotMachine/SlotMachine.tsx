import { useState } from "react";
import * as S from "./SlotMachine.styles";
import { ISlotState, Slot } from "./components/slot/Slot";

export const SlotMachine = () => {
	const slotItems = ["A", "B", "C", "D", "E", "F"];
	const [slotState, setSlotState] = useState<ISlotState>("stop");

	const handleOnClickSpin = () => {
		if (slotState) {
			setSlotState("spin");
		}
	};

	return (
		<S.Spin onClick={handleOnClickSpin}>
			<S.SlotMachine>
				<S.Slot_1>
					<Slot slotState={slotState} setSlotState={setSlotState} items={slotItems} startItem={1} stopItem={5} />
				</S.Slot_1>
			</S.SlotMachine>
		</S.Spin>
	);
};
