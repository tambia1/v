import { Pager } from "@src/components/pager/Pager";
import * as S from "./ApplicationContainer.styles";
import { usePager } from "@src/components/pager/hooks/UsePager";
import { ReactElement } from "react";
import { IAppId } from "../../Applications";

interface Props {
	appId: IAppId;
	appTitle: string;
	appComponent: ReactElement;
}

export const ApplicationContainer = ({ appId, appTitle, appComponent }: Props) => {
	const pager = usePager();

	const handleOnClose = () => {
		pager.popPage();
	};

	return (
		<S.ApplicationContainer>
			<Pager onClose={handleOnClose}>
				<Pager.Page id={appId} title={appTitle}>
					{appComponent}
				</Pager.Page>
			</Pager>
		</S.ApplicationContainer>
	);
};
