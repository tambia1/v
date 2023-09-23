import { useState, ReactNode } from "react";
import * as S from "./Pager.styles";
import { Page } from "./component/page/Page";
import { PagerContext } from "./component/hooks/UsePager";

interface Props {
	children?: ReactNode;
}

export const Pager = ({ children, ...rest }: Props) => {
	const [items, setItems] = useState<{ id: string; node: ReactNode }[]>([{ id: "first", node: children }]);

	console.log({ length: items.length, items });

	const push = (id: string, node: ReactNode) => {
		setItems((prevItems) => [...prevItems, { id: id, node: node }]);
	};

	const pop = () => {
		setItems((prevItems) => [...prevItems.slice(0, -1)]);
	};

	const home = () => {
		setItems([items[0]]);
	};

	return (
		<PagerContext.Provider value={{ items, push, pop, home }}>
			<S.Pager {...rest}>
				{items.map((item) => (
					<Pager.Page key={item.id} id={item.id}>
						{item.node}
					</Pager.Page>
				))}
			</S.Pager>
		</PagerContext.Provider>
	);
};

Pager.Page = Page;
