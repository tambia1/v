import { type Touch, useTouch } from "@src/hooks/UseTouch";
import { type ReactNode, useEffect, useRef, useState } from "react";
import * as S from "./Pager.styles";

type Props = {
	className?: string;
	children: ReactNode[];
	disabled?: boolean;
	initialPageIndex?: number;
	onMouseUp?: (pageIndex: number) => void;
	onMouseMove?: (pageIndex: number) => void;
};

export const Pager = ({ className, children: pages, onMouseUp, onMouseMove, disabled = false, initialPageIndex = 0 }: Props) => {
	const refPages = useRef<HTMLDivElement>(null);
	const refPagesPanel = useRef<HTMLDivElement>(null);
	const refInited = useRef<boolean>(false);
	const [pageIndex, setPageIndex] = useState(initialPageIndex);

	useEffect(() => {
		if (!refInited.current && refPagesPanel.current) {
			translate(refPagesPanel.current, -initialPageIndex * 100, false);
			onMouseUp?.(initialPageIndex);

			refInited.current = true;
		}
	}, [initialPageIndex, onMouseUp]);

	useTouch({
		ref: refPages,
		onTouch: ({ xStart, xMove, xEnd, status }: Touch) => {
			if (disabled) {
				return;
			}

			const divPagesPanel = refPagesPanel.current;

			if (!divPagesPanel) {
				return;
			}

			if (status === "move") {
				let gap = xMove - xStart;

				//check move
				if ((pageIndex === 0 && gap > 0) || (pageIndex === pages.length - 1 && gap < 0)) {
					gap >>= 1;
				}

				//if we have only one item then move only half
				if (pages.length === 1) {
					gap >>= 2;
				}

				//set transform/transition
				const gapInPercent = (gap / divPagesPanel.clientWidth) * 100;
				translate(divPagesPanel, -pageIndex * 100 + gapInPercent, false);
				onMouseMove?.(pageIndex);
			}

			if (status === "up") {
				const gap = xEnd - xStart;
				const direction = Math.abs(gap) < 100 ? 0 : gap / Math.abs(gap);
				let index = pageIndex;

				if (direction === 0) {
					if (gap < -(divPagesPanel.clientWidth >> 1)) {
						index = pageIndex + 1;
					} else if (gap > divPagesPanel.clientWidth >> 1) {
						index = pageIndex - 1;
					}
				} else if (direction === -1 && pageIndex < pages.length - 1) {
					index = pageIndex + 1;
				} else if (direction === 1 && pageIndex > 0) {
					index = pageIndex - 1;
				}

				setPageIndex(index);
				translate(divPagesPanel, -index * 100, true);
				onMouseUp?.(index);
			}
		},
	});

	const translate = (div: HTMLDivElement, x: number, isAnimated: boolean) => {
		div.style.transition = isAnimated ? "transform 0.3s cubic-bezier(0.2, 0.6, 0.6, 1) 0s" : "";
		div.style.transform = `translate3d(${x}% , 0px, 0px)`;
	};

	return (
		<S.Pager className={className}>
			<S.Pages ref={refPages}>
				<S.PagesPanel ref={refPagesPanel}>
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
		</S.Pager>
	);
};
