import * as S from "./Settings.styles";
import { usePager } from "@src/components/pager/hooks/UsePager";
import { Button } from "@src/components/button/Button";
import { List } from "@src/components/list/List";
import { Text } from "@src/components/text/Text";
import { Icon } from "@src/components/icon/Icon";
import { Pager } from "@src/components/pager/Pager";

export const Settings = () => {
	const pager = usePager();

	const handleOnClickA = () => {
		pager.push(
			<Pager.Page
				id="a"
				title="A"
				body={
					<S.Container>
						<div>A</div>
						<Button
							onClick={() => {
								pager.pop();
							}}
						>
							Back
						</Button>
					</S.Container>
				}
			/>
		);
	};

	const handleOnClickB = () => {
		pager.push(
			<Pager.Page
				id="b"
				title="B"
				body={
					<S.Container>
						<div>B</div>
						<Button
							onClick={() => {
								pager.pop();
							}}
						>
							Back
						</Button>
					</S.Container>
				}
			/>
		);
	};

	const handleOnClickC = () => {
		pager.push(
			<Pager.Page
				id="c"
				title="C"
				body={
					<S.Container>
						<div>C</div>
						<Button
							onClick={() => {
								pager.pop();
							}}
						>
							Back
						</Button>
					</S.Container>
				}
			/>
		);
	};

	return (
		<S.Container>
			<List>
				<Text color="accentBg">Appearance</Text>
				<List.Cell onClick={handleOnClickA}>A</List.Cell>
				<List.Cell onClick={handleOnClickB} $isEnabled={false}>
					B
				</List.Cell>
				<List.Cell onClick={handleOnClickC}>C</List.Cell>
				<List.Cell $isSelected={true}>D</List.Cell>
				<Text color="accentBg">Language</Text>
				<List.Cell>E</List.Cell>
				<List.Cell $isEnabled={false}>
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
