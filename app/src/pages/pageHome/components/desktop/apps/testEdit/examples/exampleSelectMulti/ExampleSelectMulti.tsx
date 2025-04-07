import { Icon } from "@src/components/icon/Icon";
import { Select } from "@src/components/select/Select";
import { Text } from "@src/components/text/Text";
import { useState } from "react";
import * as S from "../../TestEdit.styles";

export const ExampleSelectMulti = () => {
	const [selectMultiItems, setSelectMultiItems] = useState([
		{ value: "Item 0", isSelected: false },
		{ value: "Item 1", isSelected: false },
		{ value: "Item 2", isSelected: false },
		{ value: "Item 3", isSelected: false },
		{ value: "Item 4", isSelected: false },
		{ value: "Item 5", isSelected: false },
	]);

	const selectMultiSelections = selectMultiItems.filter((item) => item.isSelected);

	const handleOnClickSelectMulti = (index: number) => {
		const updatedItems = [...selectMultiItems];

		updatedItems[index] = {
			...updatedItems[index],
			isSelected: !updatedItems[index].isSelected,
		};

		setSelectMultiItems(updatedItems);
	};

	return (
		<S.Col>
			<Text>Select - Multi</Text>
			<Select onClickItem={handleOnClickSelectMulti} isCloseOnSelectItem={false}>
				<Select.Display>{selectMultiSelections.length === 0 ? "Nothing selected" : `${selectMultiSelections.length} items selected`}</Select.Display>
				<Select.Items>
					{selectMultiItems.map((item) => (
						<Select.Items.Item value={item.value} key={item.value}>
							<Select.Items.Item.Text>{item.value}</Select.Items.Item.Text>
							{item.isSelected && (
								<Select.Items.Item.Image>
									<Icon iconName={"iconCheck"} />
								</Select.Items.Item.Image>
							)}
						</Select.Items.Item>
					))}
				</Select.Items>
			</Select>
		</S.Col>
	);
};
