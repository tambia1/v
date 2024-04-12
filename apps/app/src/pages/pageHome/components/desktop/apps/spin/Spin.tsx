import { useState } from "react";
import * as S from "./Spin.styles";
import { ISlotState, Slot } from "./components/Slot";

export const Spin = () => {
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
					<Slot items={slotItems} slotState={slotState} setSlotState={setSlotState} />
				</S.Slot_1>
			</S.SlotMachine>
		</S.Spin>
	);
};
