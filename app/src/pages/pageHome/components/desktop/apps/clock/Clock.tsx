import { useEffect, useState } from "react";
import * as S from "./Clock.styles";

export const Clock = () => {
	const [hour, setHour] = useState(0);
	const [minute, setMinute] = useState(0);
	const [second, setSecond] = useState(0);

	useEffect(() => {
		const tick = () => {
			const date = new Date();

			setSecond(date.getSeconds());
			setMinute(date.getMinutes());
			setHour(date.getHours());
		};

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
					<S.Numbers key={number} $number={number}>
						<S.NumbersBox $number={number}>
							<S.NumbersMarker $number={number} />
							<S.NumbersText>{number}</S.NumbersText>
						</S.NumbersBox>
					</S.Numbers>
				))}
				<S.Hour $rotate={hour} />
				<S.Minute $rotate={minute} />
				<S.Second $rotate={second} />
				<S.Dot />
			</S.ClockCircle>
		</S.Clock>
	);
};
