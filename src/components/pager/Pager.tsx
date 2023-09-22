import { useState, ReactNode } from "react";
import * as S from "./Pager.styles";
import { Page } from "./Page";

interface Props {
	currentIndex: number;
	children?: ReactNode[];
}

export const Pager = ({ children, currentIndex, ...rest }: Props) => {
	const [items, setItems] = useState<ReactNode[] | undefined>(children);

	return (
		<S.Pager {...rest}>
			{children?.map((child, i) => (
				<Pager.Page key={i} index={i - currentIndex}>
					{child}
				</Pager.Page>
			))}
		</S.Pager>
	);
};

Pager.Page = Page;
