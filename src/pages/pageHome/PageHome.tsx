import * as S from "./PageHome.styles";
import { Pager } from "@src/components/pager/Pager";
import { Applications } from "./components/applications/Applications";

export const PageHome = () => {
	return (
		<S.PageHome>
			<Pager animtionType="show">
				<Pager.Page id="applications" title="Applications">
					<Applications />
				</Pager.Page>
			</Pager>
		</S.PageHome>
	);
};
