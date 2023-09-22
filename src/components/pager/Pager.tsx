import { useState, ReactNode } from "react";
import * as S from "./Pager.styles";
import { Page } from "./component/page/Page";

interface Props {
	index: number;
	children?: ReactNode[];
}

export const Pager = ({ children, index, ...rest }: Props) => {
	return (
		<S.Pager {...rest}>
			{children?.map((child, i) => (
				<Pager.Page key={i} index={i - index}>
					{child}
				</Pager.Page>
			))}
		</S.Pager>
	);
};

Pager.Page = Page;
