export const UtilsTouch = {
	listenToTouches: ({
		div,
		onTouchStart,
		onTouchMove,
		onTouchEnd,
		onTouchCancel,
	}: {
		div: HTMLElement;
		onTouchStart?: (e: TouchEvent | MouseEvent, sx: number, sy: number, x: number, y: number, time: number) => void;
		onTouchMove?: (e: TouchEvent | MouseEvent, sx: number, sy: number, x: number, y: number, time: number) => void;
		onTouchEnd?: (e: TouchEvent | MouseEvent, sx: number, sy: number, x: number, y: number, time: number) => void;
		onTouchCancel?: (e: TouchEvent | MouseEvent, sx: number, sy: number, x: number, y: number, time: number) => void;
	}) => {
		//detect touch device
		const isTouchScreen = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.maxTouchPoints > 0;

		const MOUSE_DOWN = isTouchScreen ? "touchstart" : "mousedown";
		const MOUSE_MOVE = isTouchScreen ? "touchmove" : "mousemove";
		const MOUSE_UP = isTouchScreen ? "touchend" : "mouseup";
		const MOUSE_ENTER = "mouseenter";
		const MOUSE_OUT = "mouseout";

		let status: "" | "down" | "move" | "up" | "out" = "";
		let boundingX = 0;
		let boundingY = 0;
		let sx = 0;
		let sy = 0;
		let timeStart = 0;
		let timeEnd = 0;

		const getX = (e: TouchEvent | MouseEvent) => {
			if ("changedTouches" in e && e.changedTouches?.[0]) {
				return e.changedTouches[0].pageX;
			}

			if ("touches" in e && e.touches?.[0]) {
				return e.touches[0].pageX;
			}

			return (e as MouseEvent).pageX || 0;
		};

		const getY = (e: TouchEvent | MouseEvent) => {
			if ("changedTouches" in e && e.changedTouches?.[0]) {
				return e.changedTouches[0].pageY;
			}

			if ("touches" in e && e.touches?.[0]) {
				return e.touches[0].pageY;
			}

			return (e as MouseEvent).pageY || 0;
		};

		div.addEventListener(MOUSE_DOWN, (e: TouchEvent | MouseEvent) => {
			//mouse down
			// e.preventDefault();

			status = "down";
			div.setAttribute("isPressed", "true");

			boundingX = div.getBoundingClientRect().left + window.scrollX + 0.5;
			boundingY = div.getBoundingClientRect().top + window.scrollY + 0.5;

			const x = Math.floor(getX(e) - boundingX + div.scrollLeft);
			const y = Math.floor(getY(e) - boundingY + div.scrollTop);

			sx = x;
			sy = y;

			timeStart = Date.now();

			onTouchStart?.(e, sx, sy, x, y, 0);

			//mouse up
			const mouseUpListener = (e: TouchEvent | MouseEvent) => {
				// e.preventDefault();

				const x = Math.floor(getX(e) - boundingX + div.scrollLeft);
				const y = Math.floor(getY(e) - boundingY + div.scrollTop);

				timeEnd = Date.now();

				const time = timeEnd - timeStart;

				if (status === "down" || status === "move") {
					status = "up";
					div.setAttribute("isPressed", "false");

					onTouchEnd?.(e, sx, sy, x, y, time);
				}

				if (status === "out") {
					status = "";
					onTouchCancel?.(e, sx, sy, x, y, time);
				}
			};

			document.addEventListener(MOUSE_UP, mouseUpListener, { passive: false });

			//mouse out
			const mouseOutListener = () => {
				// e.preventDefault();

				if (status === "down") {
					status = "out";
					div.setAttribute("isPressed", "false");
				}
			};

			document.addEventListener(MOUSE_OUT, mouseOutListener, { passive: false });

			//mouse enter
			const mouseEnterListener = () => {
				// e.preventDefault();

				if (status === "out") {
					status = "down";
					div.setAttribute("isPressed", "true");
				}
			};

			document.addEventListener(MOUSE_ENTER, mouseEnterListener, { passive: false });
		});

		//mouse move
		const mouseMoveListener = (e: TouchEvent | MouseEvent) => {
			// e.preventDefault();

			const x = Math.floor(getX(e) - boundingX + div.scrollLeft);
			const y = Math.floor(getY(e) - boundingY + div.scrollTop);

			timeEnd = Date.now();

			const time = timeEnd - timeStart;

			onTouchMove?.(e, sx, sy, x, y, time);
		};

		document.addEventListener(MOUSE_MOVE, mouseMoveListener, { passive: false });

		status = "";
		div.setAttribute("isPressed", "false");
	},
};
