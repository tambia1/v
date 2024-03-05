import { useCallback, useRef, useState } from "react";

function preventDefault(e: Event) {
	if (!isTouchEvent(e)) return;

	if (e.touches.length < 2 && e.preventDefault) {
		e.preventDefault();
	}
}

export function isTouchEvent(e: Event): e is TouchEvent {
	return e && "touches" in e;
}

interface PressHandlers {
	onLongPress: (e: React.MouseEvent | React.TouchEvent) => void;
	onClick?: (e: React.MouseEvent | React.TouchEvent) => void;
}

interface Options {
	delay?: number;
	shouldPreventDefault?: boolean;
}

export default function useLongPress({ onLongPress, onClick }: PressHandlers, { delay = 300, shouldPreventDefault = true }: Options = {}) {
	const [longPressTriggered, setLongPressTriggered] = useState(false);
	const timeout = useRef<NodeJS.Timeout>();
	const target = useRef<EventTarget>();

	const start = useCallback(
		(e: React.MouseEvent | React.TouchEvent) => {
			e.persist();
			const clonedEvent = { ...e };

			if (shouldPreventDefault && e.target) {
				e.target.addEventListener("touchend", preventDefault, { passive: false });
				target.current = e.target;
			}

			timeout.current = setTimeout(() => {
				onLongPress(clonedEvent);
				setLongPressTriggered(true);
			}, delay);
		},
		[onLongPress, delay, shouldPreventDefault]
	);

	const clear = useCallback(
		(e: React.MouseEvent | React.TouchEvent, shouldTriggerClick = true) => {
			timeout.current && clearTimeout(timeout.current);
			shouldTriggerClick && !longPressTriggered && onClick?.(e);

			setLongPressTriggered(false);

			if (shouldPreventDefault && target.current) {
				target.current.removeEventListener("touchend", preventDefault);
			}
		},
		[shouldPreventDefault, onClick, longPressTriggered]
	);

	return {
		onMouseDown: (e: React.MouseEvent) => start(e),
		onTouchStart: (e: React.TouchEvent) => start(e),
		onMouseUp: (e: React.MouseEvent) => clear(e),
		onMouseLeave: (e: React.MouseEvent) => clear(e, false),
		onTouchEnd: (e: React.TouchEvent) => clear(e),
	};
}
