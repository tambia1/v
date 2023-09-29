import { useState } from "react";
import * as S from "./Pager.styles";
import { Item } from "./components/item/Item";
import { PagerContext } from "./hooks/UsePager";
import { State } from "./components/item/Item.styles";
import { Text } from "../text/Text";
import { Icon } from "../icon/Icon";
import { Page, IPage } from "./components/page/Page";

interface Props {
	children?: IPage;
	onChange?: (action: "start" | "end", leave: IPageState) => void;
}

export interface IPageState {
	state: State;
	page: IPage;
}

export const Pager = ({ children, onChange }: Props) => {
	const [pages, setPages] = useState<IPageState[]>(children ? [{ state: "goToCenter", page: children }] : []);

	const push = (page: IPage) => {
		setPages((prevPages) => {
			const newPages = prevPages.map((page) => ({ ...page, state: "moveFromCenterToLeft" as State }));

			return [
				...newPages,
				{
					page,
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

	const onAnimationStart = (page: IPageState) => {
		onChange?.("start", page);
	};

	const onAnimationEnd = (page: IPageState) => {
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
				<S.Headers>
					<S.Back>
						<S.BackContainer onClick={handleGoBack} $isVisible={pages.length > 1}>
							<Icon iconName="chevronLeft" size="l" />
						</S.BackContainer>
					</S.Back>
					<S.Text>
						<Text>{pages.at(-1)?.page?.props.title}</Text>
					</S.Text>
				</S.Headers>
				<S.Bodies>
					{pages.map((page) => (
						<Item key={page.page.props.id} state={page.state} onAnimationStart={() => onAnimationStart(page)} onAnimationEnd={() => onAnimationEnd(page)}>
							{page.page.props.body}
						</Item>
					))}
				</S.Bodies>
			</S.Container>
		</PagerContext.Provider>
	);
};

Pager.Page = Page;
