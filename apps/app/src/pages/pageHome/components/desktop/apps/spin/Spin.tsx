import { useState } from "react";
import * as S from "./Spin.styles";
import { ISlotState, Slot } from "./components/Slot";

export const Spin = () => {
	const slotItems = ["A", "B", "C", "D", "E", "F"];
	// const slotItems = ["A", "B", "C", "D", "E"];
	// const slotItems = ["A", "B", "C", "D"];
	// const slotItems = ["A", "B", "C"];
	// const slotItems = ["A", "B"];
	// const slotItems = ["A"];
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
