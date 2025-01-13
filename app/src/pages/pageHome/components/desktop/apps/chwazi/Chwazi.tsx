import { useTimeout } from "@src/hooks/UseTimeout";
import { type TouchEvent, useEffect, useState } from "react";
import * as S from "./Chwazi.styles";

type Circle = {
	id: number;
	x: number;
	y: number;
	color: string;
	isSelected: boolean;
};

export const Chwazi = () => {
	const [circles, setCircles] = useState<Circle[]>([]);
	const timeoutPick = useTimeout({
		delay: 2000,
		callback: () => setIsPick(true),
	});

	const [isGlowing, setIsGlowing] = useState(false);
	const [isProgressing, setIsProgressing] = useState(false);
	const [event, setEvent] = useState<TouchEvent<HTMLDivElement> | null>(null);
	const [isPick, setIsPick] = useState(false);

	useEffect(() => {
		if (event) {
			const newCircles = getCircles(event);
			setCircles(newCircles);

			setIsGlowing(false);
			setEvent(null);

			if (newCircles.length > 0) {
				setIsProgressing(true);
				timeoutPick.start();
			} else {
				setIsProgressing(false);
				timeoutPick.stop();
			}
		}
	}, [event, timeoutPick]);

	useEffect(() => {
		if (isPick) {
			const randomIndex = Math.floor(Math.random() * circles.length);

			circles[randomIndex].isSelected = true;

			setCircles([...circles]);
			setIsGlowing(true);
			setIsPick(false);

			timeoutPick.stop();
		}
	}, [isPick, circles, timeoutPick]);

	const handleOnTouchStart = (e: TouchEvent<HTMLDivElement>) => {
		setEvent(e);
		setIsGlowing(false);
		setIsProgressing(false);
	};

	const handleOnTouchMove = (e: TouchEvent<HTMLDivElement>) => {
		setEvent(e);
	};

	const handleOnTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
		setEvent(e);
		setIsGlowing(false);
		setIsProgressing(false);
	};

	const getCircles = (e: TouchEvent<HTMLDivElement>) => {
		const touches = Array.from(e.touches);
		const element = e.target as HTMLDivElement;

		const boundingX = element.getBoundingClientRect().left + window.scrollX;
		const boundingY = element.getBoundingClientRect().top + window.scrollY;

		const newCircles = touches.map((touch) => {
			const existingCircle = circles.find((circle) => circle.id === touch.identifier);
			const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;

			const circle: Circle = {
				id: touch.identifier,
				x: Math.floor(touch.clientX - boundingX),
				y: Math.floor(touch.clientY - boundingY),
				color: existingCircle?.color || randomColor,
				isSelected: true,
			};

			return circle;
		});

		return newCircles;
	};

	return (
		<S.Chwazi onTouchStart={handleOnTouchStart} onTouchMove={handleOnTouchMove} onTouchEnd={handleOnTouchEnd} $isGlowing={isGlowing}>
			<S.ProgressBar $isProgressing={isProgressing} />

			{circles.map(
				(circle) => circle.isSelected && <S.Circle key={circle.id} color={circle.color} style={{ left: circle.x, top: circle.y }} $isAnimate={true} />,
			)}
		</S.Chwazi>
	);
};
