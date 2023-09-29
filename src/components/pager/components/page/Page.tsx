import { ReactElement, ReactNode } from "react";

export type IPage = ReactElement<Props, typeof Page>;

export interface Props {
	id: string;
	title: string;
	body: ReactNode;
}

export const Page = ({}: Props) => {
	return null;
};
