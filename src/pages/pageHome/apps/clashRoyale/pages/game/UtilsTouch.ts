export const UtilsTouch = {
	listenToTouches: function ({
		div,
		onTouchStart,
		onTouchMove,
		onTouchEnd,
		onTouchCancel,
	}: {
		div: HTMLElement;
		onTouchStart?: (e: TouchEvent | MouseEvent, xx: number, yy: number, x: number, y: number, time: number) => void;
		onTouchMove?: (e: TouchEvent | MouseEvent, xx: number, yy: number, x: number, y: number, time: number) => void;
		onTouchEnd?: (e: TouchEvent | MouseEvent, xx: number, yy: number, x: number, y: number, time: number) => void;
		onTouchCancel?: (e: TouchEvent | MouseEvent, xx: number, yy: number, x: number, y: number, time: number) => void;
	}) {
		//detect touch device
		const isTouchDevice = "ontouchstart" in window ? true : false;

		const MOUSE_DOWN = isTouchDevice ? "touchstart" : "mousedown";
		const MOUSE_MOVE = isTouchDevice ? "touchmove" : "mousemove";
		const MOUSE_UP = isTouchDevice ? "touchend" : "mouseup";
		const MOUSE_ENTER = "mouseenter";
		const MOUSE_OUT = "mouseout";

		let status: "" | "down" | "move" | "up" | "out" = "";
		let boundingX: number = 0;
		let boundingY: number = 0;
		let xx: number = 0;
		let yy: number = 0;
		let timeStart: number = 0;
		let timeEnd: number = 0;

		div.addEventListener(MOUSE_DOWN, (e: TouchEvent | MouseEvent) => {
			//mouse down
			// e.preventDefault();

			status = "down";
			div.setAttribute("isPressed", "true");

			boundingX = div.getBoundingClientRect().left + window.scrollX + 0.5;
			boundingY = div.getBoundingClientRect().top + window.scrollY + 0.5;

			let x = Math.floor((e as TouchEvent).touches?.[0]?.pageX || (e as MouseEvent).pageX || 0 - boundingX);
			let y = Math.floor((e as TouchEvent).touches?.[0]?.pageY || (e as MouseEvent).pageY || 0 - boundingY);

			xx = x;
			yy = y;

			timeStart = new Date().getTime();

			onTouchStart?.(e, xx, yy, x, y, 0);

			//mouse move
			let mouseMoveListener = (e: TouchEvent | MouseEvent) => {
				// e.preventDefault();

				if (status == "down" || status == "move") {
					status = "move";
					div.setAttribute("isPressed", "true");

					let x = Math.floor((e as TouchEvent).touches?.[0]?.pageX || (e as MouseEvent).pageX || 0 - boundingX);
					let y = Math.floor((e as TouchEvent).touches?.[0]?.pageY || (e as MouseEvent).pageY || 0 - boundingY);

					timeEnd = new Date().getTime();

					let time = timeEnd - timeStart;

					onTouchMove?.(e, xx, yy, x, y, time);
				}
			};

			document.addEventListener(MOUSE_MOVE, mouseMoveListener, { passive: false });

			//mouse up
			let mouseUpListener = (e: TouchEvent | MouseEvent) => {
				// e.preventDefault();

				let x = Math.floor((e as TouchEvent).touches?.[0]?.pageX || (e as MouseEvent).pageX || 0 - boundingX);
				let y = Math.floor((e as TouchEvent).touches?.[0]?.pageY || (e as MouseEvent).pageY || 0 - boundingY);

				timeEnd = new Date().getTime();

				let time = timeEnd - timeStart;

				if (status == "down" || status == "move") {
					status = "up";
					div.setAttribute("isPressed", "false");

					onTouchEnd?.(e, xx, yy, x, y, time);
				}

				if (status == "out") {
					status = "";
					onTouchCancel?.(e, xx, yy, x, y, time);
				}
			};

			document.addEventListener(MOUSE_UP, mouseUpListener, { passive: false });

			//mouse out
			let mouseOutListener = () => {
				// e.preventDefault();

				if (status == "down") {
					status = "out";
					div.setAttribute("isPressed", "false");
				}
			};

			document.addEventListener(MOUSE_OUT, mouseOutListener, { passive: false });

			//mouse enter
			let mouseEnterListener = () => {
				// e.preventDefault();

				if (status == "out") {
					status = "down";
					div.setAttribute("isPressed", "true");
				}
			};

			document.addEventListener(MOUSE_ENTER, mouseEnterListener, { passive: false });
		});

		status = "";
		div.setAttribute("isPressed", "false");
	},
};
