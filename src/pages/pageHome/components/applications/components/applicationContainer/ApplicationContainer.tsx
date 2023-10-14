import { Pager } from "@src/components/pager/Pager";
import * as S from "./ApplicationContainer.styles";
import { usePager } from "@src/components/pager/hooks/UsePager";
import { IAppId } from "@src/pages/pageHome/data/apps";
import { Settings } from "../settings/Settings";
import { ReactElement } from "react";
import { useLanguage } from "@src/language/hooks/UseLanguage";

interface Props {
	appId: IAppId;
}

export const ApplicationContainer = ({ appId }: Props) => {
	const pager = usePager();
	const { language } = useLanguage();

	const components: { [K in IAppId]: { title: string; component: ReactElement } } = {
		settings: {
			title: language.settings.title,
			component: <Settings />,
		},
		calculator: {
			title: language.calculator.title,
			component: <></>,
		},
		camera: {
			title: language.camera.title,
			component: <></>,
		},
		notes: {
			title: language.notes.title,
			component: <></>,
		},
	};

	const handleOnClose = () => {
		pager.popPage();
	};

	return (
		<S.ApplicationContainer>
			<Pager onClose={handleOnClose}>
				<Pager.Page id={appId} title={components[appId].title}>
					{components[appId].component}
				</Pager.Page>
			</Pager>
		</S.ApplicationContainer>
	);
};
