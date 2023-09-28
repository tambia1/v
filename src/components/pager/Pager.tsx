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
	onChange?: (action: "start" | "end", leave: ILeave) => void;
}

export interface ILeave {
	state: State;
	page: IPage;
}

export const Pager = ({ children, onChange }: Props) => {
	const [leaves, setLeaves] = useState<ILeave[]>(!children ? [] : [{ state: "goToCenter", page: children }]);

	const push = (page: IPage) => {
		setLeaves((prevPages) => {
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
		setLeaves((prevPages) => {
			const newPages = [...prevPages];

			if (newPages.length >= 2) {
				newPages[newPages.length - 1].state = "moveFromCenterToRight";
				newPages[newPages.length - 2].state = "moveFromLeftToCenter";
			}

			return newPages;
		});
	};

	const home = () => {
		setLeaves([leaves[0]]);
	};

	const onAnimationStart = (page: ILeave) => {
		onChange?.("start", page);
	};

	const onAnimationEnd = (page: ILeave) => {
		onChange?.("end", page);

		if (page.state === "moveFromCenterToRight") {
			setLeaves((prevPages) => [...prevPages.slice(0, -1)]);
		}
	};

	const handleGoBack = () => {
		pop();
	};

	return (
		<PagerContext.Provider value={{ pages: leaves, push, pop, home }}>
			<S.Container>
				<Header>
					<S.Back>
						{leaves.length > 1 && (
							<S.BackContainer onClick={handleGoBack}>
								<Icon iconName="chevronLeft" size="l" />
							</S.BackContainer>
						)}
					</S.Back>
					<S.Text>
						<Text>{leaves.at(-1)?.page?.props.title}</Text>
					</S.Text>
				</Header>
				<S.Bodies>
					{leaves.map((page) => (
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
