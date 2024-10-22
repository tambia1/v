import { Button } from "@src/components/button/Button";
import { Check } from "@src/components/check/Check";
import { ContextMenu } from "@src/components/contextMenu/ContextMenu";
import { Counter } from "@src/components/counter/Counter";
import { Flag } from "@src/components/flag/Flag";
import { Icon } from "@src/components/icon/Icon";
import { Input } from "@src/components/input/Input";
import { List } from "@src/components/list/List";
import { Progress } from "@src/components/progress/Progress";
import { Select } from "@src/components/select/Select";
import { Switch, type SwitchState } from "@src/components/switch/Switch";
import { Text } from "@src/components/text/Text";
import { T } from "@src/locales/T";
import i18n, { lang } from "@src/locales/i18n";
import { useRef, useState } from "react";
import * as S from "./TestEdit.styles";

export const TestEdit = () => {
	const [switchState, setSwitchState] = useState<SwitchState>("left");

	const [checkState, setCheckState] = useState(true);

	const [counter, setCounter] = useState(0);

	const [inputValue, setInputValue] = useState("Test");

	const [isCoverVisible, setIsCoverVisible] = useState(false);
	const refButtonSubmenu = useRef(null);

	const [contextMenuSelectedItem, setContextMenuSelectedItem] = useState(0);

	const handleOnClickSwitch = () => {
		setSwitchState(switchState === "left" ? "right" : "left");
	};

	const handleOnTextChange = (value: string) => {
		setInputValue(value);
	};

	const handleOnclickCheck = () => {
		setCheckState(!checkState);
	};

	const handleOnClickMinusCounter = () => {
		setCounter(counter - 1);
	};

	const handleOnClickPlusCounter = () => {
		setCounter(counter + 1);
	};

	const handleOnClickContextMenuCover = () => {
		setIsCoverVisible(!isCoverVisible);
	};

	const handleOnclickContextMenu = (index: number) => {
		setContextMenuSelectedItem(index);
	};

	return (
		<S.TestEdit>
			<Text fontSize="title">
				<T>{lang.testEdit.title}</T>
			</Text>

			<S.Spacer />
			<S.Spacer />

			<S.Col>
				<S.Line />

				<S.Col>
					<Text>Typography</Text>
					<S.Row>
						<Text fontSize="title" fontWeight="title">
							Test
						</Text>
						<Text>title</Text>
					</S.Row>
					<S.Row>
						<Text fontSize="header" fontWeight="header">
							Test
						</Text>
						<Text>header</Text>
					</S.Row>
					<S.Row>
						<Text fontSize="body" fontWeight="body">
							Test
						</Text>
						<Text>body</Text>
					</S.Row>
					<S.Row>
						<Text fontSize="note" fontWeight="note">
							Test
						</Text>
						<Text>note</Text>
					</S.Row>
				</S.Col>

				<S.Line />

				<S.Col>
					<Text>Switch</Text>
					<Switch switchState={switchState} onClickSwitch={handleOnClickSwitch} />
				</S.Col>

				<S.Line />

				<S.Col>
					<Text>Check</Text>
					<Check checkState={checkState} onClickCheck={handleOnclickCheck} />
				</S.Col>

				<S.Line />

				<S.Col>
					<Text>Counter</Text>
					<Counter val={counter} onClickMinus={handleOnClickMinusCounter} onClickPlus={handleOnClickPlusCounter} />
				</S.Col>

				<S.Line />

				<S.Col>
					<Text>Input</Text>

					<S.Row>
						<Input value={inputValue} onTextChange={handleOnTextChange} />
						enabled
					</S.Row>

					<S.Row>
						<Input value={inputValue} onTextChange={handleOnTextChange} disabled />
						disabled
					</S.Row>
				</S.Col>

				<S.Line />

				<S.Col>
					<Text>Button</Text>
					<S.Row>
						<Button variant="styled">Button Text</Button>
						variant="styled"
					</S.Row>

					<S.Row>
						<Button variant="full">Button Text</Button>
						variant="full"
					</S.Row>

					<S.Row>
						<Button variant="stroke">Button Text</Button>
						variant="stroke"
					</S.Row>

					<S.Row>
						<Button variant="link">Button Text</Button>
						variant="link"
					</S.Row>
				</S.Col>

				<S.Line />

				<S.Col>
					<Text>Progress</Text>
					<Progress percent={75} />
				</S.Col>

				<S.Line />

				<S.Col>
					<Text>Select</Text>
					<Select selectedIndex={0} onClickItem={() => {}}>
						<Select.Item>Item 0</Select.Item>
						<Select.Item>Item 1</Select.Item>
						<Select.Item>Item 2</Select.Item>
					</Select>
				</S.Col>

				<S.Line />

				<S.Col>
					<Text>Contextmenu</Text>
					<Button variant="link" onClick={handleOnClickContextMenuCover} ref={refButtonSubmenu}>
						Open menu
					</Button>
					<ContextMenu visible={isCoverVisible} onClickCover={handleOnClickContextMenuCover} refButton={refButtonSubmenu}>
						<List>
							<List.Cell
								onClick={() => {
									handleOnclickContextMenu(0);
								}}
								$lineState="long"
							>
								<List.Cell.Center>Item 0</List.Cell.Center>
								<List.Cell.Right>
									<Icon iconName={contextMenuSelectedItem === 0 ? "iconCheck" : ""} />
								</List.Cell.Right>
							</List.Cell>
							<List.Cell
								onClick={() => {
									handleOnclickContextMenu(1);
								}}
								$lineState="long"
							>
								<List.Cell.Center>Item 1</List.Cell.Center>
								<List.Cell.Right>
									<Icon iconName={contextMenuSelectedItem === 1 ? "iconCheck" : ""} />
								</List.Cell.Right>
							</List.Cell>
							<List.Cell
								onClick={() => {
									handleOnclickContextMenu(2);
								}}
								$lineState="long"
							>
								<List.Cell.Center>Item 2</List.Cell.Center>
								<List.Cell.Right>
									<Icon iconName={contextMenuSelectedItem === 2 ? "iconCheck" : ""} />
								</List.Cell.Right>
							</List.Cell>
						</List>
					</ContextMenu>
				</S.Col>

				<S.Line />

				<S.Col>
					<Text>List</Text>
					<List>
						<List.Cell onClick={() => {}}>
							<List.Cell.Left>
								<Flag flagName="gb" />
							</List.Cell.Left>
							<List.Cell.Center>
								<T>{lang.settings.language.english}</T>
							</List.Cell.Center>
							<List.Cell.Right>
								<Icon iconName={i18n.language === "en" ? "iconCheck" : ""} />
							</List.Cell.Right>
						</List.Cell>

						<List.Cell onClick={() => {}}>
							<List.Cell.Left>
								<Flag flagName="fi" />
							</List.Cell.Left>
							<List.Cell.Center>
								<T>{lang.settings.language.finnish}</T>
							</List.Cell.Center>
							<List.Cell.Right>
								<Icon iconName={i18n.language === "fi" ? "iconCheck" : ""} />
							</List.Cell.Right>
						</List.Cell>

						<List.Cell onClick={() => {}}>
							<List.Cell.Left>
								<Icon iconName="iconGlobe" />
							</List.Cell.Left>
							<List.Cell.Center>
								<T>{lang.settings.language.title}</T>
							</List.Cell.Center>
							<List.Cell.Right>
								<Icon iconName="iconChevronRight" />
							</List.Cell.Right>
						</List.Cell>

						<List.Cell onClick={() => {}}>
							<List.Cell.Left>
								<Icon iconName="iconLayout" />
							</List.Cell.Left>
							<List.Cell.Center>
								<T>{lang.settings.layout.title}</T>
							</List.Cell.Center>
							<List.Cell.End>
								<T>Top</T>
							</List.Cell.End>
							<List.Cell.Right>
								<Icon iconName="iconChevronRight" />
							</List.Cell.Right>
						</List.Cell>

						<List.Cell onClick={() => {}}>
							<T>{lang.settings.about.title}</T>
						</List.Cell>
					</List>
				</S.Col>
			</S.Col>
		</S.TestEdit>
	);
};
