import { Button } from "@src/components/button/Button";
import { Check } from "@src/components/check/Check";
import { Flag } from "@src/components/flag/Flag";
import { Icon } from "@src/components/icon/Icon";
import { IconButton } from "@src/components/iconButton/IconButton";
import { Input } from "@src/components/input/Input";
import { List } from "@src/components/list/List";
import { PopupMenu } from "@src/components/popupMenu/PopupMenu";
import { Progress } from "@src/components/progress/Progress";
import { Select } from "@src/components/select/Select";
import { Stepper } from "@src/components/stepper/Stepper";
import { Switch } from "@src/components/switch/Switch";
import { Tab } from "@src/components/tab/Tab";
import { Text } from "@src/components/text/Text";
import { T } from "@src/locales/T";
import i18n, { lang } from "@src/locales/i18n";
import { useState } from "react";
import * as S from "./TestEdit.styles";

export const TestEdit = () => {
	const [switchChecked, setSwitchChecked] = useState(false);

	const [checkState, setCheckState] = useState(true);

	const [stepperValue, setStepperValue] = useState(0);

	const [inputValue, setInputValue] = useState("Test");

	const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);
	const [popupMenuSelectedItem, setPopupMenuSelectedItem] = useState("item_0");

	const [selectSingleSelection, setSelectSingleSelection] = useState(0);

	const [selectMultiItems, setSelectMultiItems] = useState([
		{ value: "Item 0", isSelected: false },
		{ value: "Item 1", isSelected: false },
		{ value: "Item 2", isSelected: false },
		{ value: "Item 3", isSelected: false },
		{ value: "Item 4", isSelected: false },
		{ value: "Item 5", isSelected: false },
	]);
	const selectMultiSelections = selectMultiItems.filter((item) => item.isSelected);

	const [selectdTabIndex, setSelectedTabIndex] = useState(0);

	const handleOnClickSwitch = () => {
		setSwitchChecked(!switchChecked);
	};

	const handleOnTextChange = (value: string) => {
		setInputValue(value);
	};

	const handleOnclickCheck = () => {
		setCheckState(!checkState);
	};

	const handleOnClickMinusStepper = () => {
		setStepperValue(stepperValue - 1);
	};

	const handleOnClickPlusStepper = () => {
		setStepperValue(stepperValue + 1);
	};

	const handleOnClickPopupMenu = () => {
		setIsPopupMenuOpen(!isPopupMenuOpen);
	};

	const handleOnClickPopupMenuItem = (_index: number, value: string) => {
		setPopupMenuSelectedItem(value);
		setIsPopupMenuOpen(false);
	};

	const handleOnClickSelectSingle = (index: number) => {
		setSelectSingleSelection(index);
	};

	const handleOnClickSelectMulti = (index: number) => {
		const updatedItems = [...selectMultiItems];

		updatedItems[index] = {
			...updatedItems[index],
			isSelected: !updatedItems[index].isSelected,
		};

		setSelectMultiItems(updatedItems);
	};

	const handleOnClickTab = (index: number, _value: string) => {
		setSelectedTabIndex(index);
	};

	return (
		<S.TestEdit>
			<Text variant="title">
				<T>{lang.testEdit.title}</T>
			</Text>

			<S.Spacer />
			<S.Spacer />

			<S.Col>
				<S.Line />

				<S.Col>
					<Text>Text</Text>

					<S.Row>
						<Text variant="title">Test</Text>
						<Text>title</Text>
					</S.Row>
					<S.Row>
						<Text variant="header">Test</Text>
						<Text>header</Text>
					</S.Row>
					<S.Row>
						<Text variant="body">Test</Text>
						<Text>body</Text>
					</S.Row>
					<S.Row>
						<Text variant="note">Test</Text>
						<Text>note</Text>
					</S.Row>
				</S.Col>

				<S.Line />

				<S.Col>
					<Text>Switch</Text>

					<S.Row>
						<S.Cell>Enables</S.Cell>
						<S.Cell>Disabled</S.Cell>
					</S.Row>

					<S.Row>
						<S.Cell>
							<Switch data-testid="switch-test" checked={switchChecked} onClickSwitch={handleOnClickSwitch} />
						</S.Cell>
						<S.Cell>
							<Switch disabled data-testid="switch-test" checked={false} onClickSwitch={() => {}} />
						</S.Cell>
					</S.Row>
				</S.Col>

				<S.Line />

				<S.Col>
					<Text>Check</Text>

					<S.Row>
						<S.Cell>Enables</S.Cell>
						<S.Cell>Disabled</S.Cell>
					</S.Row>

					<S.Row>
						<S.Cell>
							<Check data-testid="check-test" checked={checkState} onClickCheck={handleOnclickCheck} />
						</S.Cell>
						<S.Cell>
							<Check disabled data-testid="check-test" checked={checkState} onClickCheck={handleOnclickCheck} />
						</S.Cell>
					</S.Row>
				</S.Col>

				<S.Line />

				<S.Col>
					<Text>Button</Text>

					<S.Row>
						<S.Cell />
						<S.Cell>Enables</S.Cell>
						<S.Cell>Disabled</S.Cell>
					</S.Row>

					<S.Row>
						<S.Cell>variant="styled"</S.Cell>
						<S.Cell>
							<Button variant="styled">Button Text</Button>
						</S.Cell>
						<S.Cell>
							<Button variant="styled" disabled>
								Button Text
							</Button>
						</S.Cell>
					</S.Row>

					<S.Row>
						<S.Cell>variant="full"</S.Cell>
						<S.Cell>
							<Button variant="full">Button Text</Button>
						</S.Cell>
						<S.Cell>
							<Button variant="full" disabled>
								Button Text
							</Button>
						</S.Cell>
					</S.Row>

					<S.Row>
						<S.Cell> variant="stroke"</S.Cell>
						<S.Cell>
							<Button variant="stroke">Button Text</Button>
						</S.Cell>
						<S.Cell>
							<Button variant="stroke" disabled>
								Button Text
							</Button>
						</S.Cell>
					</S.Row>

					<S.Row>
						<S.Cell>variant="link"</S.Cell>
						<S.Cell>
							<Button variant="link">Button Text</Button>
						</S.Cell>
						<S.Cell>
							<Button variant="link" disabled>
								Button Text
							</Button>
						</S.Cell>
					</S.Row>
				</S.Col>

				<S.Line />

				<S.Col>
					<Text>Progress</Text>
					<Progress percent={75} />
				</S.Col>

				<S.Line />

				<S.Col>
					<Text>Input</Text>

					<S.Row>
						<S.Cell>Enables</S.Cell>
						<S.Cell>Disabled</S.Cell>
					</S.Row>

					<S.Row>
						<Input value={inputValue} onTextChange={handleOnTextChange} />
						<Input value={inputValue} onTextChange={handleOnTextChange} disabled />
					</S.Row>
				</S.Col>

				<S.Line />

				<S.Col>
					<Text>Stepper</Text>
					<S.Row>
						<Input value={String(stepperValue)} textAlign="center" />
						<Stepper onClickMinus={handleOnClickMinusStepper} onClickPlus={handleOnClickPlusStepper} />
					</S.Row>
				</S.Col>

				<S.Line />

				<S.Col>
					<Text>Select - Single</Text>
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

				<S.Line />

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

				<S.Line />

				<S.Col>
					<Text>Popup Menu</Text>

					<IconButton iconName="iconMoreVertical" onClick={handleOnClickPopupMenu} />

					<PopupMenu
						isOpen={isPopupMenuOpen}
						checkedItem={popupMenuSelectedItem}
						onClickItem={handleOnClickPopupMenuItem}
						onClickOutside={handleOnClickPopupMenu}
					>
						<PopupMenu.Item value="item_a">Item A</PopupMenu.Item>
						<PopupMenu.Item value="item_b">Item B</PopupMenu.Item>
						<PopupMenu.Item value="item_c">Item C</PopupMenu.Item>
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

				<S.Line />

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
			</S.Col>
		</S.TestEdit>
	);
};
