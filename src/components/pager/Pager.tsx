import { useState, ReactNode } from "react";
import * as S from "./Pager.styles";
import { Page } from "./component/page/Page";
import { PagerContext } from "./component/hooks/UsePager";
import { State } from "./component/page/Page.styles";

interface Props {
	children?: ReactNode;
	onChange?: (action: "start" | "end", page: Page) => void;
}

interface Page {
	id: string;
	node: ReactNode;
	state: State;
}

export const Pager = ({ children, onChange, ...rest }: Props) => {
	const [pages, setPages] = useState<Page[]>(children ? [{ id: "children", node: children, state: "goToCenter" }] : []);

	const push = (id: string, node: ReactNode) => {
		setPages((prevPages) => {
			const newPages = prevPages.map((page) => ({ ...page, state: "moveFromCenterToLeft" as State }));

			return [
				...newPages,
				{
					id: id,
					node: node,
					state: "moveFromRightToCenter",
				},
			];
		});
	};

	const pop = () => {
		setPages((prevPages) => {
			const newPages = [...prevPages];

			if (newPages.length >= 2) {
				newPages[newPages.length - 1].state = "moveFromCenterToRight";
				newPages[newPages.length - 2].state = "moveFromLeftToCenter";
			}

			return newPages;
		});
	};

	const home = () => {
		setPages([pages[0]]);
	};

	const onAnimationStart = (page: Page) => {
		onChange?.("start", page);
	};

	const onAnimationEnd = (page: Page) => {
		onChange?.("end", page);

		if (page.state === "moveFromCenterToRight") {
			setPages((prevPages) => [...prevPages.slice(0, -1)]);
		}
	};

	return (
		<PagerContext.Provider value={{ pages: pages, push, pop, home }}>
			<S.Pager {...rest}>
				{pages.map((page) => {
					return (
						<Pager.Page key={page.id} state={page.state} onAnimationStart={() => onAnimationStart(page)} onAnimationEnd={() => onAnimationEnd(page)}>
							{page.node}
						</Pager.Page>
					);
				})}
			</S.Pager>
		</PagerContext.Provider>
	);
};

Pager.Page = Page;
