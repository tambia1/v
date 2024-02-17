import { ReactNode, useCallback, useRef, useState } from "react";
import * as S from "./Paging.styles";
import { ITouch, useTouch } from "@src/hooks/UseTouch";

interface Props {
	children: ReactNode[];
}

export const Paging = ({ children: pages }: Props) => {
	const refPages = useRef<HTMLDivElement>(null);
	const refPagesPanel = useRef<HTMLDivElement>(null);
	const [pageIndex, setPageIndex] = useState(0);
	const [pageState, setPageState] = useState<S.IPageState>("go");
	const [translateX, setTranslateX] = useState(0);

	useTouch({
		ref: refPages,
		onTouch: (props) => onTouch(props),
	});

	const onTouch = useCallback(
		({ xStart, xMove, xEnd, status }: ITouch) => {
			const divPagesPanel = refPagesPanel.current;

			if (!divPagesPanel) {
				return;
			}

			if (status === "move") {
				let gap = xMove - xStart;

				//check move
				if ((pageIndex == 0 && gap > 0) || (pageIndex == pages.length - 1 && gap < 0)) {
					gap >>= 1;
				}

				//if we have only one item then move only half
				if (pages.length == 1) {
					gap >>= 2;
				}

				//set state to go (prevent css animation while we are draging)
				setPageState("go");

				//set transform/transition
				const gapInPercent = (gap / divPagesPanel.clientWidth) * 100;
				setTranslateX(-pageIndex * 100 + gapInPercent);
			}

			if (status === "up") {
				const gap = xEnd - xStart;
				const direction = Math.abs(gap) < 100 ? 0 : gap / Math.abs(gap);
				let index = pageIndex;

				if (direction == 0) {
					if (gap < -(divPagesPanel.clientWidth >> 1)) {
						index = pageIndex + 1;
					} else if (gap > divPagesPanel.clientWidth >> 1) {
						index = pageIndex - 1;
					}
				} else if (direction == -1) {
					index = pageIndex + 1;
				} else if (direction == 1) {
					index = pageIndex - 1;
				}

				setPageState("move");
				setPageIndex(index);
				setTranslateX(-index * 100);
			}
		},
		[refPagesPanel.current]
	);

	return (
		<S.Paging>
			<S.Pages ref={refPages}>
				<S.PagesPanel ref={refPagesPanel} $pageState={pageState} $translateX={translateX}>
					{pages.map((page, index) => (
						<S.Page key={index}>{page}</S.Page>
					))}
				</S.PagesPanel>
			</S.Pages>
			<S.Dots>
				{pages.map((_, index) => (
					<S.Dot key={index} $isSelected={pageIndex === index} />
				))}
			</S.Dots>
		</S.Paging>
	);
};
