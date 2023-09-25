import { useState, ReactNode } from "react";
import * as S from "./Pager.styles";
import { Page } from "./components/page/Page";
import { PagerContext } from "./hooks/UsePager";
import { State } from "./components/page/Page.styles";
import { Header } from "./components/header/Header";
import { Text } from "../text/Text";
import { Icons } from "../icon/Icon.types";
import { Icon } from "../icon/Icon";

interface Props {
	children?: ReactNode;
	onChange?: (action: "start" | "end", page: Page) => void;
}

interface Page {
	id: string;
	node: ReactNode;
	state: State;
}

export const Pager = ({ children, onChange }: Props) => {
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

	const handleGoBack = () => {
		pop();
	};

	return (
		<PagerContext.Provider value={{ pages: pages, push, pop, home }}>
			<S.Container>
				<Header>
					<S.Back>{pages.length > 1 && <Icon iconName="chevronLeft" size="l" onClick={handleGoBack} />}</S.Back>
					<Text>{pages.at(-1)?.id}</Text>
				</Header>
				<S.Pages>
					{pages.map((page) => {
						return (
							<Pager.Page key={page.id} state={page.state} onAnimationStart={() => onAnimationStart(page)} onAnimationEnd={() => onAnimationEnd(page)}>
								{page.node}
							</Pager.Page>
						);
					})}
				</S.Pages>
			</S.Container>
		</PagerContext.Provider>
	);
};

Pager.Page = Page;
