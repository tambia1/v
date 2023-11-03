import { DropDown } from "@src/components/dropDown/DropDown";
import * as S from "./TestDropDown.styles";

export const TestDropDown = () => {
	return (
		<S.TestDropDown>
			<DropDown selectedItemIndex={1} items={["Item A", "Item B", "Item C"]} />
		</S.TestDropDown>
	);
};
