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
	const [event, setEvent] = useState<TouchEvent<HTMLDivElement> | null>(null);
	const [circles, setCircles] = useState<Circle[]>([]);
	const [isGlowing, setIsGlowing] = useState(false);
	const [isProgressing, setIsProgressing] = useState(false);
	const [status, setStatus] = useState<"idle" | "started" | "ended" | "picked">("idle");

	const timeoutPick = useTimeout({
		delay: 2000,
		callback: () => setStatus("ended"),
	});

	useEffect(() => {
		if (event) {
			const newCircles = getCircles(event, circles);
			setCircles(() => newCircles);

			if (newCircles.length > 0) {
				setStatus("started");
				setIsProgressing(true);
			} else {
				setStatus("idle");
				setIsProgressing(false);
			}

			setEvent(null);
		}
	}, [event, circles]);

	useEffect(() => {
		if (status === "ended") {
			setCircles((prevCircles) => {
				const randomIndex = Math.floor(Math.random() * prevCircles.length);

				return prevCircles.map((circle, index) => ({
					...circle,
					isSelected: index === randomIndex,
				}));
			});

			setIsGlowing(true);
			setStatus("picked");
			setEvent(null);

			timeoutPick.stop();
		}
	}, [status, timeoutPick]);

	const handleOnTouchStart = (e: TouchEvent<HTMLDivElement>) => {
		if (status === "picked") {
			return;
		}

		setEvent(e);
		setIsProgressing(false);
		setIsGlowing(false);

		timeoutPick.stop();
		timeoutPick.start();
	};

	const handleOnTouchMove = (e: TouchEvent<HTMLDivElement>) => {
		setEvent(e);
	};

	const handleOnTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
		setEvent(e);
		setIsProgressing(false);
		setIsGlowing(false);

		timeoutPick.stop();
	};

	const getCircles = (e: TouchEvent<HTMLDivElement>, circles: Circle[]) => {
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
				isSelected: existingCircle ? existingCircle.isSelected : true,
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
