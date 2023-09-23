import { useState, ReactNode } from "react";
import * as S from "./Pager.styles";
import { Page } from "./component/page/Page";
import { PagerContext } from "./component/hooks/UsePager";
import { State } from "./component/page/Page.styles";

interface Props {
	children?: ReactNode;
}

export const Pager = ({ children, ...rest }: Props) => {
	const [items, setItems] = useState<{ id: string; node: ReactNode; state: State }[]>(children ? [{ id: "children", node: children, state: "goToCenter" }] : []);

	console.log({ length: items.length, items });

	const push = (id: string, node: ReactNode) => {
		setItems((prevState) => {
			const newItems = prevState.map((item) => ({ ...item, state: "moveFromCenterToLeft" as State }));

			return [...newItems, { id: id, node: node, state: "moveFromRightToCenter" }];
		});
	};

	const pop = () => {
		setItems((prevState) => {
			const newItems = [...prevState];

			if (newItems.length >= 2) {
				newItems[newItems.length - 1].state = "moveFromCenterToRight";
				newItems[newItems.length - 2].state = "moveFromLeftToCenter";
			}

			return newItems;
		});
	};

	const home = () => {
		setItems([items[0]]);
	};

	const onAnimationStart = (state: State) => {
		console.log("onAnimationStart");
	};

	const onAnimationEnd = (state: State) => {
		console.log("onAnimationEnd");

		if (state === "moveFromCenterToRight") {
			setItems((prevItems) => [...prevItems.slice(0, -1)]);
		}
	};

	return (
		<PagerContext.Provider value={{ items, push, pop, home }}>
			<S.Pager {...rest}>
				{items.map((item, i) => {
					return (
						<Pager.Page key={item.id} state={item.state} onAnimationStart={() => onAnimationStart(item.state)} onAnimationEnd={() => onAnimationEnd(item.state)}>
							{item.node}
						</Pager.Page>
					);
				})}
			</S.Pager>
		</PagerContext.Provider>
	);
};

Pager.Page = Page;
