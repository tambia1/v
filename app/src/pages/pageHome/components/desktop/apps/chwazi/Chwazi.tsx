import { useTimeout } from "@src/hooks/UseTimeout";
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
	const [state, setState] = useState<"idle" | "started" | "ended">("idle");

	const containerRef = useRef<HTMLDivElement>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const { start, stop, isActive } = useTimeout({
		callback: () => {
			console.log("timeout", isActive);
		},
	});

	useEffect(() => {
		return () => {
			clearTimeout(timeoutRef.current || undefined);
		};
	}, []);

	useEffect(() => {
		if (state === "ended") {
			const randomIndex = Math.floor(Math.random() * circles.length);
			const selectedCircle = circles[randomIndex];

			setSelectedCircle(selectedCircle);
		}
	}, [state, circles]);

	const handleOnTouchStart = (e: TouchEvent<HTMLDivElement>) => {
		if (!isActive) {
			start(1000);
		}

		if (!containerRef.current) {
			return;
		}

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}

		const element = containerRef.current;
		const newCircles = getCircles(e, element);

		setState("started");
		setCircles(newCircles);
		setIsGlowing(false);
		setIsProgressing(false);

		setTimeout(() => {
			setIsProgressing(true);
		}, 100);

		timeoutRef.current = setTimeout(() => {
			setState("ended");
			setIsGlowing(true);
			setIsProgressing(false);
		}, 2000);
	};

	const handleOnTouchMove = (e: TouchEvent<HTMLDivElement>) => {
		if (!containerRef.current) {
			return;
		}

		if (selectedCircle) {
			return;
		}

		const element = containerRef.current;
		const newCircles = getCircles(e, element);

		setCircles(newCircles);
	};

	const handleOnTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
		if (isActive) {
			stop();
		}

		const remainingCircles = circles.filter((c) => !Array.from(e.changedTouches).some((t) => t.identifier === c.id));

		setState("idle");
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

	return (
		<S.Chwazi ref={containerRef} onTouchStart={handleOnTouchStart} onTouchMove={handleOnTouchMove} onTouchEnd={handleOnTouchEnd} $isGlowing={isGlowing}>
			<S.ProgressBar $isProgressing={isProgressing} />

			{!selectedCircle &&
				circles.map((circle) => <S.Circle key={circle.id} color={circle.color} style={{ left: circle.x, top: circle.y }} $isAnimate={true} />)}

			{selectedCircle && (
				<S.Circle key={selectedCircle.id} color={selectedCircle.color} style={{ left: selectedCircle.x, top: selectedCircle.y }} $isAnimate={false} />
			)}
		</S.Chwazi>
	);
};
