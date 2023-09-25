import * as S from "./Settings.styles";
import { usePager } from "@src/components/pager/component/hooks/UsePager";
import { Button } from "@src/components/button/Button";
import { List } from "@src/components/list/List";
import { Text } from "@src/components/text/Text";
import { Icon } from "@src/components/icon/Icon";

export const Settings = () => {
	const pager = usePager();

	const handleOnClickNextA = () => {
		pager.push(
			"B",
			<S.Container>
				<div>B</div>
				<Button onClick={handleOnClickNextB}>Next</Button>
				<Button onClick={handleOnClickBackB}>Back</Button>
			</S.Container>
		);
	};

	const handleOnClickNextB = () => {
		pager.push(
			"C",
			<S.Container>
				<div>C</div>
				<Button onClick={handleOnClickBackC}>Back</Button>
			</S.Container>
		);
	};

	const handleOnClickBackB = () => {
		pager.pop();
	};

	const handleOnClickBackC = () => {
		pager.pop();
	};

	return (
		<S.Container>
			<Text>Settings</Text>
			<List>
				<List.Cell>A</List.Cell>
				<List.Cell $isEnabled={false}>B</List.Cell>
				<List.Cell>C</List.Cell>
				<List.Cell $isSelected={true}>D</List.Cell>
				<List.Cell>E</List.Cell>
				<List.Cell>
					<List.Cell.Image>
						<Icon iconName="redisPrimary" />
					</List.Cell.Image>
					<List.Cell.Text>
						<Text>F</Text>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName="chevronRight" />
					</List.Cell.Arrow>
				</List.Cell>
				<List.Cell>G</List.Cell>
				<List.Cell>H</List.Cell>
				<List.Cell>I</List.Cell>
				<List.Cell>J</List.Cell>
			</List>
		</S.Container>
	);
};
