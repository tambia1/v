import { ReactElement, ReactNode } from "react";

export type IPage = ReactElement<Props, typeof Page>;

export interface Props {
	id: string;
	title: string;
	children: ReactNode;
}

export const Page = ({ children }: Props) => {
	return <>{children}</>;
};
