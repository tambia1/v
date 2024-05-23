import * as S from "./List.styles";
import { ReactNode } from "react";
import { Cell } from "./components/cell/Cell";
import { Section } from "./components/section/Section";

interface Props {
	className?: string | undefined;
	children?: ReactNode;
}

export const List = ({ className, children }: Props) => {
	return <S.List className={className}>{children}</S.List>;
};

List.Cell = Cell;
List.Section = Section;
