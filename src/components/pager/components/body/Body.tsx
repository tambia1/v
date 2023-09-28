import { ReactElement, ReactNode } from "react";

export type TBody = ReactElement<Props, typeof Body>;

export interface Props {
	id: string;
	title: string;
	page: ReactNode;
}

export const Body = ({}: Props) => {
	return null;
};
