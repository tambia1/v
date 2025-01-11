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
	const [selectedCircle, setSelectedCircle] = useState<Circle | null>(null);

	const [isGlowing, setIsGlowing] = useState(false);
	const [isProgressing, setIsProgressing] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		return () => {
			clearTimeout(timeoutRef.current || undefined);
		};
	}, []);

	const handleOnTouchStart = (e: TouchEvent<HTMLDivElement>) => {
		if (!containerRef.current) {
			return;
		}

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}

		const element = containerRef.current;
		const newCircles = getCircles(e, element);

		setCircles(newCircles);
		setIsGlowing(false);
		setIsProgressing(false);

		setTimeout(() => {
			setIsProgressing(true);
		}, 100);

		timeoutRef.current = setTimeout(() => {
			selectRandomCircle();
			setIsGlowing(true);
			setIsProgressing(false);
		}, 2000);
	};

	const handleOnTouchMove = (e: TouchEvent<HTMLDivElement>) => {
		if (!containerRef.current) {
			return;
		}

		const element = containerRef.current;
		const newCircles = getCircles(e, element);

		setCircles(newCircles);
	};

	const handleOnTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
		const remainingCircles = circles.filter((c) => !Array.from(e.changedTouches).some((t) => t.identifier === c.id));

		setCircles(remainingCircles);
		setIsProgressing(false);
		setSelectedCircle(null);

		clearTimeout(timeoutRef.current || undefined);
	};

	const getCircles = (e: TouchEvent<HTMLDivElement>, element: HTMLDivElement) => {
		const touches = Array.from(e.touches);

		const boundingX = element.getBoundingClientRect().left + window.scrollX;
		const boundingY = element.getBoundingClientRect().top + window.scrollY;

		const newCircles = touches.map((touch) => {
			const existingCircle = circles.find((circle) => circle.id === touch.identifier);
			const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;

			return {
				id: touch.identifier,
				x: Math.floor(touch.clientX - boundingX),
				y: Math.floor(touch.clientY - boundingY),
				color: existingCircle?.color || randomColor,
			};
		});

		return newCircles;
	};

	const selectRandomCircle = () => {
		const randomIndex = Math.floor(Math.random() * circles.length);
		const selectedCircle = circles[randomIndex];

		setSelectedCircle(selectedCircle);
	};

	return (
		<S.Chwazi ref={containerRef} onTouchStart={handleOnTouchStart} onTouchMove={handleOnTouchMove} onTouchEnd={handleOnTouchEnd} $isGlowing={isGlowing}>
			<S.ProgressBar $isProgressing={isProgressing} />

			{circles.map((circle) => (
				<S.Circle key={circle.id} color={circle.color} style={{ left: circle.x, top: circle.y }} />
			))}

			{selectedCircle && <S.Circle key={selectedCircle.id} color={selectedCircle.color} style={{ left: selectedCircle.x, top: selectedCircle.y }} />}
		</S.Chwazi>
	);
};
