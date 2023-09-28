import { useState } from "react";
import * as S from "./Pager.styles";
import { Body } from "./components/body/Body";
import { PagerContext } from "./hooks/UsePager";
import { State } from "./components/body/Body.styles";
import { Header } from "./components/header/Header";
import { Text } from "../text/Text";
import { Icon } from "../icon/Icon";
import { Page, IPage } from "./components/page/Page";

interface Props {
	children?: IPage;
	onChange?: (action: "start" | "end", page: IFrame) => void;
}

export interface IFrame {
	state: State;
	page?: IPage;
}

export const Pager = ({ children, onChange }: Props) => {
	const [pages, setPages] = useState<IFrame[]>(!children ? [] : [{ state: "goToCenter", page: children }]);

	const push = (node: IPage) => {
		setPages((prevPages) => {
			const newPages = prevPages.map((page) => ({ ...page, state: "moveFromCenterToLeft" as State }));

			return [
				...newPages,
				{
					page: node,
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

	const onAnimationStart = (page: IFrame) => {
		onChange?.("start", page);
	};

	const onAnimationEnd = (page: IFrame) => {
		onChange?.("end", page);

		if (page.state === "moveFromCenterToRight") {
			setPages((prevPages) => [...prevPages.slice(0, -1)]);
		}
	};

	const handleGoBack = () => {
		pop();
	};

	return (
		<PagerContext.Provider value={{ pages, push, pop, home }}>
			<S.Container>
				<Header>
					<S.Back>
						{pages.length > 1 && (
							<S.BackContainer onClick={handleGoBack}>
								<Icon iconName="chevronLeft" size="l" />
							</S.BackContainer>
						)}
					</S.Back>
					<S.Text>
						<Text>{pages.at(-1)?.page?.props.title}</Text>
					</S.Text>
				</Header>
				<S.Bodies>
					{pages.map((page) => (
						<Body key={page.page?.props.id} state={page.state} onAnimationStart={() => onAnimationStart(page)} onAnimationEnd={() => onAnimationEnd(page)}>
							{page.page?.props.body}
						</Body>
					))}
				</S.Bodies>
			</S.Container>
		</PagerContext.Provider>
	);
};

Pager.Page = Page;
