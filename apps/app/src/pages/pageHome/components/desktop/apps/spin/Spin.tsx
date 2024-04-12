import * as S from "./Spin.styles";

export const Spin = () => {
	const spinItems = ["A", "B", "C", "D", "E", "F"];

	return (
		<S.Spin>
			<S.SlotMachine>
				<S.Slot></S.Slot>
			</S.SlotMachine>
		</S.Spin>
	);
};
