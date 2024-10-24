import type { HTMLAttributes, ReactNode } from "react";

export type Props = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode;
};

export const Item = ({ children }: Props) => {
	return <>{children}</>;
};
