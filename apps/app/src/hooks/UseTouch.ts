import { DependencyList, RefObject, useEffect } from "react";

export type IStatus = "down" | "move" | "up" | "out" | "long";
export type ITouch = {
	e: TouchEvent | MouseEvent;
	xStart: number;
	yStart: number;
	xMove: number;
	yMove: number;
	xEnd: number;
	yEnd: number;
	time: number;
	status: IStatus;
};

interface Props {
	ref: RefObject<HTMLElement>;
	onTouch: (touch: ITouch) => void;
	deps?: DependencyList | undefined;
}

export const useTouch = ({ ref, onTouch, deps }: Props) => {
	useEffect(() => {
		const div = ref.current;

		if (!div) {
			return;
		}

		const isTouchDevice = "ontouchstart" in window ? true : false;

		const MOUSE_DOWN = isTouchDevice ? "touchstart" : "mousedown";
		const MOUSE_MOVE = isTouchDevice ? "touchmove" : "mousemove";
		const MOUSE_UP = isTouchDevice ? "touchend" : "mouseup";
		const MOUSE_ENTER = "mouseenter";
		const MOUSE_OUT = "mouseout";
		const LONG_PRESS_MS = 700;

		let status: IStatus;
		let boundingX: number = 0;
		let boundingY: number = 0;
		let xStart: number = 0;
		let yStart: number = 0;
		let xMove: number = 0;
		let yMove: number = 0;
		let xEnd: number = 0;
		let yEnd: number = 0;
		let timeStart: number = 0;
		let timeEnd: number = 0;
		let longPressTimeout: NodeJS.Timeout;

		const getX = (e: TouchEvent | MouseEvent) => {
			return (e as TouchEvent).changedTouches?.[0]?.pageX || (e as MouseEvent).pageX || 0;
		};

		const getY = (e: TouchEvent | MouseEvent) => {
			return (e as TouchEvent).touches?.[0]?.pageY || (e as MouseEvent).pageY || 0;
		};

		const mouseDownListener = (e: TouchEvent | MouseEvent) => {
			status = "down";

			boundingX = div.getBoundingClientRect().left + window.scrollX + 0.5;
			boundingY = div.getBoundingClientRect().top + window.scrollY + 0.5;

			xStart = Math.floor(getX(e) - boundingX);
			yStart = Math.floor(getY(e) - boundingY);

			xMove = xStart;
			yMove = yStart;

			xEnd = xStart;
			yEnd = yStart;

			timeStart = new Date().getTime();

			const time = 0;

			onTouch({ e, xStart, yStart, xMove, yMove, xEnd, yEnd, time, status });

			longPressTimeout = setTimeout(() => {
				onTouch({ e, xStart, yStart, xMove, yMove, xEnd, yEnd, time, status: "long" });
			}, LONG_PRESS_MS);

			document.addEventListener(MOUSE_MOVE, mouseMoveListener, { passive: false });
			document.addEventListener(MOUSE_UP, mouseUpListener, { passive: false });
			document.addEventListener(MOUSE_OUT, mouseOutListener, { passive: false });
			document.addEventListener(MOUSE_ENTER, mouseEnterListener, { passive: false });
		};

		const mouseMoveListener = (e: TouchEvent | MouseEvent) => {
			if (status == "down" || status == "move") {
				status = "move";

				xMove = Math.floor(getX(e) - boundingX);
				yMove = Math.floor(getY(e) - boundingY);

				xEnd = xStart;
				yEnd = yStart;

				timeEnd = new Date().getTime();

				const time = timeEnd - timeStart;

				onTouch({ e, xStart, yStart, xMove, yMove, xEnd, yEnd, time, status });
			}
		};

		const mouseUpListener = (e: TouchEvent | MouseEvent) => {
			xEnd = Math.floor(getX(e) - boundingX);
			yEnd = Math.floor(getY(e) - boundingY);

			timeEnd = new Date().getTime();

			const time = timeEnd - timeStart;

			if (status == "down" || status == "move") {
				status = "up";
			}

			if (status == "out") {
				status = "out";
			}

			onTouch({ e, xStart, yStart, xMove, yMove, xEnd, yEnd, time, status });

			clearTimeout(longPressTimeout);
		};

		const mouseOutListener = () => {
			if (status == "down") {
				status = "out";
			}
		};

		const mouseEnterListener = () => {
			if (status == "out") {
				status = "down";
			}
		};

		div.addEventListener(MOUSE_DOWN, mouseDownListener, { passive: false });

		status = "up";

		return () => {
			div.removeEventListener(MOUSE_DOWN, mouseDownListener);
			document.removeEventListener(MOUSE_MOVE, mouseMoveListener);
			document.removeEventListener(MOUSE_UP, mouseUpListener);
			document.removeEventListener(MOUSE_OUT, mouseOutListener);
			document.removeEventListener(MOUSE_ENTER, mouseEnterListener);
		};
	}, [ref.current, deps]);
};
