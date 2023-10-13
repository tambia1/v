import { Pager } from "@src/components/pager/Pager";
import * as S from "./ApplicationContainer.styles";
import { ReactNode } from "react";
import { usePager } from "@src/components/pager/hooks/UsePager";

interface Props {
	children?: ReactNode;
}

export const ApplicationContainer = ({ children }: Props) => {
	const pager = usePager();

	const handleOnClose = () => {
		pager.popPage();
	};

	return (
		<S.ApplicationContainer>
			<Pager onClose={handleOnClose}>
				<Pager.Page id="applicationContainer" title="">
					{children}
				</Pager.Page>
			</Pager>
		</S.ApplicationContainer>
	);
};
