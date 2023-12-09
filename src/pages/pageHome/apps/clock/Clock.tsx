import { useState, useEffect } from "react";
import * as S from "./Clock.styles";

export const Clock = () => {
	const [hour, setHour] = useState(0);
	const [minute, setMinute] = useState(0);
	const [second, setSecond] = useState(0);

	const tick = () => {
		const date = new Date();

		setSecond(date.getSeconds());
		setMinute(date.getMinutes());
		setHour(date.getHours());
	};

	useEffect(() => {
		tick();

		const timer = setInterval(tick, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<S.Clock>
			<S.ClockCircle>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((number) => (
					<S.Number key={number} $number={number}>
						<S.NumberBox $number={number}>
							<S.Marker $number={number} />
							<span>{number}</span>
						</S.NumberBox>
					</S.Number>
				))}
				<S.Hour $rotate={hour} />
				<S.Minute $rotate={minute} />
				<S.Second $rotate={second} />
				<S.Dot />
			</S.ClockCircle>
		</S.Clock>
	);
};
