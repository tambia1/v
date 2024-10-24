import { List } from "@src/components/list/List";
import type { HTMLAttributes, ReactNode } from "react";
import { useContextMenu } from "../../context/UsePopupMenu";
import * as S from "./Items.styles";
import { Item } from "./components/item/Item";

export type Props = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode[];
};

export const Items = ({ children }: Props) => {
	const context = useContextMenu();

	return (
		<S.ItemsContainer ref={context.refCover} $visible={context.isVisible} onClick={context.onClickCover}>
			<S.Items ref={context.refItems} $left={context.position.left} $top={context.position.top}>
				<S.ItemsList $isOpen={context.isItemsOpen}>
					<List>{children}</List>
				</S.ItemsList>
			</S.Items>
		</S.ItemsContainer>
	);
};

Items.Item = Item;
