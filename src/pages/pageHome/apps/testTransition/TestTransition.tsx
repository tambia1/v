import { useState } from "react";
import * as S from "./TestTransition.styles";
import { Select } from "@src/components/select/Select";
import { Transition } from "@src/components/transition/Transition";

export const TestTransition = () => {
	const [selectIndex, setSelectIndex] = useState(0);

	const onClickSelect = (index: number) => {
		setSelectIndex(index);
	};

	return (
		<S.TestTransition>
			<Select selectedIndex={selectIndex} onClickItem={onClickSelect}>
				<Select.Item>Element 1</Select.Item>
				<Select.Item>Element 2</Select.Item>
			</Select>

			<S.ElementContainer>
				<Transition>
					{selectIndex === 0 && <>This is a sample text</>}
					{selectIndex === 1 && <>abcd efg</>}
				</Transition>
			</S.ElementContainer>
		</S.TestTransition>
	);
};
