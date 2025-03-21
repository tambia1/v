import type { ReactNode } from "react";

export interface Props {
	id: string;
	title: ReactNode;
	children: ReactNode;
}

export const Page = ({ children }: Props) => {
	return <>{children}</>;
};
