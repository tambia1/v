import { useEffect, useRef } from "react";
import * as S from "./Calendar.styles";

export const Calendar = () => {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth() + 1;
	const currentDay = currentDate.getDate();

	const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	const startYear = 2020;
	const endYear = startYear + 10;

	const years = Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index);
	const months = Array.from({ length: 12 }, (_, index) => index);

	const refYear = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!refYear.current) {
			return;
		}

		const timeout = setTimeout(() => {
			refYear.current?.scrollIntoView({ behavior: "smooth", inline: "start" });
		}, 500);

		return () => {
			clearTimeout(timeout);
		};
	}, []);

	return (
		<S.Calendar>
			{years.map((year) => (
				<S.Year key={year} ref={year === currentYear ? refYear : null}>
					<S.YearText $selected={year === currentYear}>{year}</S.YearText>
					<S.Line />

					{months.map((month) => {
						const daysInMonth = new Date(year, month + 1, 0).getDate();
						const startingDay = new Date(year, month, 1).getDay();

						return (
							<S.Month key={month}>
								<S.MonthText $selected={year === currentYear && month + 1 === currentMonth}>{shortMonths[month]}</S.MonthText>

								<S.MonthBox>
									{Array.from({ length: startingDay }, (_, index) => (
										<S.DayText key={`empty-${index}`} $selected={false}></S.DayText>
									))}

									{Array.from({ length: daysInMonth }, (_, index) => (
										<S.DayText key={`day-${index}`} $selected={year === currentYear && month + 1 === currentMonth && index + 1 === currentDay}>
											{index + 1}
										</S.DayText>
									))}
								</S.MonthBox>
							</S.Month>
						);
					})}
				</S.Year>
			))}
		</S.Calendar>
	);
};
