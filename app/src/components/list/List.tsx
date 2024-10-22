import type { HTMLAttributes, ReactNode } from "react";
import * as S from "./List.styles";
import { Cell } from "./components/cell/Cell";
import { Section } from "./components/section/Section";

export type Props = HTMLAttributes<HTMLDivElement> & {
	className?: string;
	children?: ReactNode;
};

export const List = ({ className, children, ...rest }: Props) => {
	return (
		<S.List className={className} {...rest}>
			{children}
		</S.List>
	);
};

List.Cell = Cell;
List.Section = Section;
