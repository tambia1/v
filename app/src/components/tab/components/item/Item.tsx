import type { HTMLAttributes, ReactNode } from "react";

export type Props = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode;
	value: string;
};

export const Item = ({ children }: Props) => {
	return <>{children}</>;
};
