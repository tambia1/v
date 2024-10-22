import { Icon } from "@src/components/icon/Icon";
import { List } from "@src/components/list/List";
import type { HTMLAttributes, ReactNode } from "react";

export type Props = HTMLAttributes<HTMLDivElement> & {
	className?: string;
	children: ReactNode;
	checked: boolean;
};

export const Item = ({ className, children, checked, ...rest }: Props) => {
	return (
		<List.Cell className={className} $lineState="long" {...rest}>
			<List.Cell.Text>{children}</List.Cell.Text>
			<List.Cell.Image>
				<Icon iconName={checked ? "iconCheck" : ""} />
			</List.Cell.Image>
		</List.Cell>
	);
};
