const getTimeBetweenDates = (dateFrom: Date, dateTo: Date) => {
	const oneYearInMs = 1000 * 60 * 60 * 24 * 365;
	const oneMonthInMs = 1000 * 60 * 60 * 24 * 30;
	const oneDayInMs = 1000 * 60 * 60 * 24;
	const oneHourInMs = 1000 * 60 * 60;
	const oneMinutesInMs = 1000 * 60;
	const oneSecInMs = 1000;
	const oneMsInMs = 1;

	const dateFromMs = new Date(dateFrom).getTime();
	const dateToMs = new Date(dateTo).getTime();

	const differenceInMs = dateToMs - dateFromMs;

	const time = {
		years: differenceInMs / oneYearInMs,
		months: differenceInMs / oneMonthInMs,
		days: differenceInMs / oneDayInMs,
		hours: differenceInMs / oneHourInMs,
		minutes: differenceInMs / oneMinutesInMs,
		seconds: differenceInMs / oneSecInMs,
		milliseconds: differenceInMs / oneMsInMs,
	};

	return time;
};

export default {
	getTimeBetweenDates,
};
