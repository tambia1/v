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
					<S.Settings>
						<div>A</div>
						<Button
							onClick={() => {
								pager.pop();
							}}
						>
							Back
						</Button>
						<Button onClick={handleOnClickAA}>Next</Button>
					</S.Settings>
				}
			/>
		);
	};

	const handleOnClickAA = () => {
		pager.push(
			<Pager.Page
				id="aa"
				title="AA"
				body={
					<S.Settings>
						<div>AA</div>
						<Button
							onClick={() => {
								pager.pop();
							}}
						>
							Back
						</Button>
					</S.Settings>
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
					<S.Settings>
						<div>B</div>
						<Button
							onClick={() => {
								pager.pop();
							}}
						>
							Back
						</Button>
					</S.Settings>
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
					<S.Settings>
						<div>C</div>
						<Button
							onClick={() => {
								pager.pop();
							}}
						>
							Back
						</Button>
					</S.Settings>
				}
			/>
		);
	};

	return (
		<S.Settings>
			<List.Title>Appearance</List.Title>

			<List>
				<List.Cell onClick={handleOnClickA}>
					<List.Cell.Image>
						<Icon iconName="globe" />
					</List.Cell.Image>
					<List.Cell.Text>
						<Text>Language</Text>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName="chevronRight" />
					</List.Cell.Arrow>
				</List.Cell>

				<List.Cell onClick={handleOnClickB}>
					<List.Cell.Image>
						<Icon iconName="aperture" />
					</List.Cell.Image>
					<List.Cell.Text>
						<Text>Theme</Text>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName="chevronRight" />
					</List.Cell.Arrow>
				</List.Cell>
				<List.Cell onClick={handleOnClickC}>About</List.Cell>
			</List>
		</S.Settings>
	);
};
