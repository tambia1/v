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

	const [isGlowing, setIsGlowing] = useState(false);
	const [isProgressing, setIsProgressing] = useState(false);

	useEffect(() => {
		return () => {
			clearTimeout(timeoutRef.current || undefined);
		};
	}, []);

	const handleOnTouchStart = (e: TouchEvent<HTMLDivElement>) => {
		if (!refContainer.current) {
			return;
		}

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}

		const element = refContainer.current;
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
		if (!refContainer.current) {
			return;
		}

		const element = refContainer.current;
		const newCircles = getCircles(e, element);

		setCircles(newCircles);
	};

	const handleOnTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
		const remainingCircles = circles.filter((c) => !Array.from(e.changedTouches).some((t) => t.identifier === c.id));

		setCircles(remainingCircles);
		setIsProgressing(false);

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
		setCircles((prevCircles) => {
			if (prevCircles.length === 0) {
				return [];
			}

			const randomIndex = Math.floor(Math.random() * prevCircles.length);
			const selectedCircle = prevCircles[randomIndex];

			return [selectedCircle];
		});
	};

	return (
		<S.Chwazi ref={refContainer} onTouchStart={handleOnTouchStart} onTouchMove={handleOnTouchMove} onTouchEnd={handleOnTouchEnd} $isGlowing={isGlowing}>
			<S.ProgressBar $isProgressing={isProgressing} />
			{circles.map((circle) => (
				<S.Circle key={circle.id} color={circle.color} style={{ left: circle.x, top: circle.y }} />
			))}
		</S.Chwazi>
	);
};
