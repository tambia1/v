import { Tab } from "@src/components/tab/Tab";
import { Text } from "@src/components/text/Text";
import { useState } from "react";
import * as S from "../TestEdit.styles";

export const ExampleTab = () => {
	const [selectdTabIndex, setSelectedTabIndex] = useState(0);

	const handleOnClickTab = (index: number, _value: string) => {
		setSelectedTabIndex(index);
	};

	return (
		<S.Col>
			<Text>Tab</Text>
			<S.Row>
				<Tab onClickItem={handleOnClickTab} selectedTabIndex={selectdTabIndex}>
					<Tab.Item value="tab_0">Tab 0</Tab.Item>
					<Tab.Item value="tab_1">Tab 1</Tab.Item>
					<Tab.Item value="tab_2">Tab 2</Tab.Item>
				</Tab>
			</S.Row>
		</S.Col>
	);
};
