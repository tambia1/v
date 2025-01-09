import { type TouchEvent, useEffect, useRef, useState } from "react";
import * as S from "./Chwazi.styles";

type Circle = {
	id: number;
	x: number;
	y: number;
	color: string;
};

export const Chwazi = () => {
	const [circles, setCircles] = useState<Circle[]>([]);
	const refContainer = useRef<HTMLDivElement>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const handleOnTouchStart = (e: TouchEvent<HTMLDivElement>) => {
		if (!refContainer.current) {
			return;
		}

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}

		const touches = Array.from(e.touches);
		const element = refContainer.current;

		const boundingX = element.getBoundingClientRect().left + window.scrollX;
		const boundingY = element.getBoundingClientRect().top + window.scrollY;

		const newCircles = touches.map((touch) => {
			const randomColor = `hsl(${Math.random() * 360}, 100%, 70%)`;

			return {
				id: touch.identifier,
				x: Math.floor(touch.clientX - boundingX),
				y: Math.floor(touch.clientY - boundingY),
				color: randomColor,
			};
		});

		setCircles(newCircles);

		timeoutRef.current = setTimeout(() => {
			selectRandomCircle();
		}, 5000);
	};

	const selectRandomCircle = () => {
		if (circles.length === 0) return;

		const randomIndex = Math.floor(Math.random() * circles.length);
		const selectedCircle = circles[randomIndex];

		setCircles([selectedCircle]);
	};

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const handleOnTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
		const remainingCircles = circles.filter((c) => !Array.from(e.changedTouches).some((t) => t.identifier === c.id));

		setCircles(remainingCircles);
	};

	return (
		<S.Chwazi ref={refContainer} onTouchStart={handleOnTouchStart} onTouchEnd={handleOnTouchEnd}>
			{circles.map((circle) => (
				<S.Circle key={circle.id} color={circle.color} style={{ left: circle.x, top: circle.y }} />
			))}
		</S.Chwazi>
	);
};
