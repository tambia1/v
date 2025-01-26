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
	const [touch, setTouch] = useState<{ type: "start" | "move" | "end"; event: TouchEvent<HTMLDivElement> | null }>({
		type: "end",
		event: null,
	});
	const [circles, setCircles] = useState<Circle[]>([]);
	const [isGlowing, setIsGlowing] = useState(false);
	const [isProgressing, setIsProgressing] = useState(false);
	const [status, setStatus] = useState<"idle" | "started" | "ended" | "picked">("idle");

	const timeoutPick = useTimeout({
		delay: 2000,
		callback: () => setStatus("ended"),
	});

	useEffect(() => {
		if (touch.event) {
			const newCircles = getCircles(touch.event, circles);
			setCircles(newCircles);

			switch (touch.type) {
				case "start": {
					setStatus("started");
					setIsProgressing(true);

					timeoutPick.stop();
					timeoutPick.start();
					break;
				}

				case "move": {
					break;
				}

				case "end": {
					if (newCircles.length > 0) {
						setIsProgressing(true);
					} else {
						setStatus("idle");
						setIsProgressing(false);

						timeoutPick.stop();
					}

					break;
				}
			}

			setTouch({ ...touch, event: null });
		}
	}, [touch, circles, timeoutPick]);

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
			setTouch({ ...touch, event: null });

			timeoutPick.stop();
		}
	}, [status, timeoutPick, touch]);

	const handleOnTouchStart = (e: TouchEvent<HTMLDivElement>) => {
		setTouch({ type: "start", event: e });
		setIsProgressing(false);
		setIsGlowing(false);
	};

	const handleOnTouchMove = (e: TouchEvent<HTMLDivElement>) => {
		setTouch({ type: "move", event: e });
	};

	const handleOnTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
		setTouch({ type: "end", event: e });
		setIsProgressing(false);
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
			<S.ProgressBar $isProgressing={isProgressing} $isPicked={status === "picked"} />

			{circles.map(
				(circle) => circle.isSelected && <S.Circle key={circle.id} color={circle.color} style={{ left: circle.x, top: circle.y }} $isAnimate={true} />,
			)}
		</S.Chwazi>
	);
};
