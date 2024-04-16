import * as S from "./SpinPage.styles";
import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import { Navigator } from "@src/components/navigator/Navigator";
import { List } from "@src/components/list/List";
import { Icon } from "@src/icons/Icon";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { Text } from "@src/components/text/Text";
import { SlotMachine } from "./components/slotMachine/SlotMachine";
import { useSpinStore } from "../store/UseSpinStore";
import { useTranslation } from "react-i18next";
import { Button } from "@src/components/button/Button";

export const SpinPage = () => {
	const navigator = useNavigator();
	const notesStore = useSpinStore();
	const { t } = useTranslation();

	const handleOnClickSpin = () => {
		navigator.pushPage(
			<Navigator.Page id="slotMachine" title={t(lang.spin.title)}>
				<SlotMachine slotItems={notesStore.data} />
			</Navigator.Page>
		);
	};

	const handleOnClickAddNote = () => {
		notesStore.setData([...notesStore.data, "" + notesStore.data.length]);
	};

	const handleOnClickRemoveNote = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
		e.stopPropagation();

		notesStore.setData([...notesStore.data.splice(index, 1)]);
	};

	return (
		<S.SpinPage>
			<List.Section>
				<S.CellGrid>
					<Icon iconName="iconPlusCircle" onClick={handleOnClickAddNote} />
					<T>{lang.spin.add}</T>
				</S.CellGrid>
			</List.Section>

			<List>
				{Object.keys(notesStore.data).map((datum, index) => (
					<List.Cell key={index}>
						<S.CellGrid>
							<Icon
								iconName="iconMinusCircle"
								onClick={(e) => {
									handleOnClickRemoveNote(e, index);
								}}
							/>
							<Text>{datum}</Text>
						</S.CellGrid>
					</List.Cell>
				))}
			</List>

			<S.Buttons>
				<Button onClick={handleOnClickSpin}>
					<T>{lang.spin.ready}</T>
				</Button>
			</S.Buttons>
		</S.SpinPage>
	);
};
