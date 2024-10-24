import { List } from "@src/components/list/List";
import type { HTMLAttributes, ReactNode } from "react";

export type Props = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode;
};

export const Item = ({ children }: Props) => {
	return <>{children}</>;
};

Item.Icon = List.Cell.Icon;
Item.Text = List.Cell.Text;
Item.Image = List.Cell.Image;
Item.Info = List.Cell.Info;
