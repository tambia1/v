import * as S from "./SpinPage.styles";
import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import { Navigator } from "@src/components/navigator/Navigator";
import { List } from "@src/components/list/List";
import { Icon } from "@src/components/icon/Icon";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { SlotMachine } from "./components/slotMachine/SlotMachine";
import { useSpinStore } from "../store/UseSpinStore";
import { useTranslation } from "react-i18next";
import { Button } from "@src/components/button/Button";

export const SpinPage = () => {
	const navigator = useNavigator();
	const spinStore = useSpinStore();
	const { t } = useTranslation();

	const handleOnClickSpin = () => {
		navigator.pushPage(
			<Navigator.Page id="slotMachine" title={t(lang.spin.title)}>
				<SlotMachine slotItems={spinStore.data} />
			</Navigator.Page>
		);
	};

	const handleOnClickAddChoice = () => {
		spinStore.setData([...spinStore.data, ""]);
	};

	const handleOnClickRemoveChoice = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
		e.stopPropagation();

		const arr = [...spinStore.data];
		arr.splice(index, 1);

		spinStore.setData(arr);
	};

	const handleDataChange = (e: React.FormEvent<HTMLInputElement>, index: number) => {
		const value = e.currentTarget.value;

		const arr = [...spinStore.data.slice(0, index), value, ...spinStore.data.slice(index + 1)];

		spinStore.setData(arr);
	};

	return (
		<S.SpinPage>
			<List.Section>
				<S.CellGrid onClick={handleOnClickAddChoice}>
					<Icon iconName="iconPlusCircle" />
					<span>
						<T>{lang.spin.add}</T>
					</span>
				</S.CellGrid>
			</List.Section>

			<List>
				{spinStore.data.map((datum, index) => (
					<List.Cell key={index}>
						<S.CellGrid>
							<Icon
								iconName="iconMinusCircle"
								onClick={(e) => {
									handleOnClickRemoveChoice(e, index);
								}}
							/>
							<S.Input value={datum} placeholder={t(lang.spin.add)} onChange={(e) => handleDataChange(e, index)} />
						</S.CellGrid>
					</List.Cell>
				))}
			</List>

			<S.Buttons>
				<Button onClick={handleOnClickSpin} disabled={spinStore.data.indexOf("") !== -1}>
					<T>{lang.spin.ready}</T>
				</Button>
			</S.Buttons>
		</S.SpinPage>
	);
};
