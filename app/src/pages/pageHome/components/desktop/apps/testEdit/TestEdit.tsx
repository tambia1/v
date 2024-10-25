import { Button } from "@src/components/button/Button";
import { Check } from "@src/components/check/Check";
import { Counter } from "@src/components/counter/Counter";
import { Flag } from "@src/components/flag/Flag";
import { Icon } from "@src/components/icon/Icon";
import { IconButton } from "@src/components/iconButton/IconButton";
import { Input } from "@src/components/input/Input";
import { List } from "@src/components/list/List";
import { PopupMenu } from "@src/components/popupMenu/PopupMenu";
import { Progress } from "@src/components/progress/Progress";
import { Select } from "@src/components/select/Select";
import { Switch, type SwitchState } from "@src/components/switch/Switch";
import { Text } from "@src/components/text/Text";
import { T } from "@src/locales/T";
import i18n, { lang } from "@src/locales/i18n";
import { useState } from "react";
import * as S from "./TestEdit.styles";

export const TestEdit = () => {
	const [switchState, setSwitchState] = useState<SwitchState>("left");

	const [checkState, setCheckState] = useState(true);

	const [counter, setCounter] = useState(0);

	const [inputValue, setInputValue] = useState("Test");

	const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);
	const [popupMenuSelectedItem, setPopupMenuSelectedItem] = useState(0);

	const [selectedOption, setSelectedOption] = useState(0);

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

	const handleOnClickPopupMenu = () => {
		setIsPopupMenuOpen(!isPopupMenuOpen);
	};

	const handleOnClickPopupMenuItem = (index: number) => {
		setPopupMenuSelectedItem(index);
		setIsPopupMenuOpen(false);
	};

	const handleOnClickSelectOption = (index: number) => {
		setSelectedOption(index);
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
					<Text>Text</Text>
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
					<Counter onClickMinus={handleOnClickMinusCounter} onClickPlus={handleOnClickPlusCounter}>
						{counter}
					</Counter>
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
					<Select onClickItem={handleOnClickSelectOption}>
						<Select.Display>{`Item ${selectedOption}`}</Select.Display>
						<Select.Items>
							<Select.Items.Item>
								<Select.Items.Item.Icon>
									<Icon iconName={"iconInfo"} />
								</Select.Items.Item.Icon>
								<Select.Items.Item.Text>Item 0</Select.Items.Item.Text>
								<Select.Items.Item.Info>info</Select.Items.Item.Info>
								<Select.Items.Item.Image>
									<Icon iconName={"iconCheck"} />
								</Select.Items.Item.Image>
							</Select.Items.Item>
							<Select.Items.Item>Item 1</Select.Items.Item>
							<Select.Items.Item>Item 2</Select.Items.Item>
						</Select.Items>
					</Select>
				</S.Col>

				<S.Line />

				<S.Col>
					<Text>Popup Menu</Text>

					<IconButton iconName="iconMoreVertical" onClick={handleOnClickPopupMenu} />

					<PopupMenu
						isOpen={isPopupMenuOpen}
						checkedItemIndex={popupMenuSelectedItem}
						onClickItem={handleOnClickPopupMenuItem}
						onClickOutside={handleOnClickPopupMenu}
					>
						<PopupMenu.Item>Item A</PopupMenu.Item>
						<PopupMenu.Item>Item B</PopupMenu.Item>
						<PopupMenu.Item>Item C</PopupMenu.Item>
					</PopupMenu>
				</S.Col>

				<S.Line />

				<S.Col>
					<Text>List</Text>
					<List>
						<List.Cell onClick={() => {}}>
							<List.Cell.Icon>
								<Flag flagName="gb" />
							</List.Cell.Icon>
							<List.Cell.Text>
								<T>{lang.settings.language.english}</T>
							</List.Cell.Text>
							<List.Cell.Image>
								<Icon iconName={i18n.language === "en" ? "iconCheck" : ""} />
							</List.Cell.Image>
						</List.Cell>

						<List.Cell onClick={() => {}}>
							<List.Cell.Icon>
								<Flag flagName="fi" />
							</List.Cell.Icon>
							<List.Cell.Text>
								<T>{lang.settings.language.finnish}</T>
							</List.Cell.Text>
							<List.Cell.Image>
								<Icon iconName={i18n.language === "fi" ? "iconCheck" : ""} />
							</List.Cell.Image>
						</List.Cell>

						<List.Cell onClick={() => {}}>
							<List.Cell.Icon>
								<Icon iconName="iconGlobe" />
							</List.Cell.Icon>
							<List.Cell.Text>
								<T>{lang.settings.language.title}</T>
							</List.Cell.Text>
							<List.Cell.Image>
								<Icon iconName="iconChevronRight" />
							</List.Cell.Image>
						</List.Cell>

						<List.Cell onClick={() => {}}>
							<List.Cell.Icon>
								<Icon iconName="iconLayout" />
							</List.Cell.Icon>
							<List.Cell.Text>
								<T>{lang.settings.layout.title}</T>
							</List.Cell.Text>
							<List.Cell.Info>
								<T>Top</T>
							</List.Cell.Info>
							<List.Cell.Image>
								<Icon iconName="iconChevronRight" />
							</List.Cell.Image>
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
