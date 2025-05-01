import { Icon } from "@src/components/icon/Icon";
import { Select } from "@src/components/select/Select";
import { useState } from "react";
import * as S from "../../TestEdit.styles";

export const ExampleSelectSingle = () => {
	const [selectSingleSelection, setSelectSingleSelection] = useState(0);

	const handleOnClickSelectSingle = (index: number) => {
		setSelectSingleSelection(index);
	};

	return (
		<S.Col>
			<S.Title>Select - Single</S.Title>
			<Select onClickItem={handleOnClickSelectSingle}>
				<Select.Display>{`Item ${selectSingleSelection}`}</Select.Display>
				<Select.Items>
					<Select.Items.Item value="item_0">
						<Select.Items.Item.Icon>
							<Icon iconName={"iconInfo"} />
						</Select.Items.Item.Icon>
						<Select.Items.Item.Text>Item 0</Select.Items.Item.Text>
						<Select.Items.Item.Info>info</Select.Items.Item.Info>
						<Select.Items.Item.Image>
							<Icon iconName={"iconCheck"} />
						</Select.Items.Item.Image>
					</Select.Items.Item>
					<Select.Items.Item value="item_1">Item 1</Select.Items.Item>
					<Select.Items.Item value="item_2">Item 2</Select.Items.Item>
					<Select.Items.Item value="item_3">Item 3</Select.Items.Item>
					<Select.Items.Item value="item_4">Item 4</Select.Items.Item>
					<Select.Items.Item value="item_5">Item 5</Select.Items.Item>
					<Select.Items.Item value="item_6">Item 6</Select.Items.Item>
					<Select.Items.Item value="item_7">Item 7</Select.Items.Item>
				</Select.Items>
			</Select>
		</S.Col>
	);
};
