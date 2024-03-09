import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export interface QueryUserResult {
	"Meta Data": {
		"1. Information": string;
		"2. Symbol": string;
		"3. Last Refreshed": string;
		"4. Interval": string;
		"5. Output Size": string;
		"6. Time Zone": string;
	};

	"Time Series (5min)": {
		[K: string]: {
			"1. open": string;
			"2. high": string;
			"3. low": string;
			"4. close": string;
			"5. volume": string;
		};
	};
}

interface QueryUserProps {}

const queryIbmStocks = (props: QueryUserProps, options?: Partial<UseQueryOptions<QueryUserResult, Error>>) => {
	return useQuery({
		queryKey: ["stocks", { ...props }],
		queryFn: async () => {
			const response = await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo");

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			return response.json();
		},
		...options,
	});
};

export const QueryStocks = {
	queryIbmStocks,
};
