import { useQuery, UseQueryOptions } from "@tanstack/react-query";

const API_KEY = "08f42b10a3844a79b80e4cc2782e4f10";

export interface QuerySymbolsResult {
	status: number;
	data: {
		symbol: string;
		name: string;
		currency: string;
		exchange: string;
		mic_code: string;
		country: string;
		type: string;
	}[];
}

interface QuerySymbolsProps {}

const symbols = (props: QuerySymbolsProps, options?: Partial<UseQueryOptions<QuerySymbolsResult, Error>>) => {
	return useQuery({
		queryKey: ["stocks", { ...props }],
		queryFn: async () => {
			const response = await fetch(`https://api.twelvedata.com/stocks?country=%22United%20States%22`);

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			return response.json();
		},
		...options,
	});
};

export interface QueryStocksResult {
	[K: string]:
		| {
				status: "ok";
				meta: {
					symbol: string;
					interval: string;
					currency: string;
					exchange_timezone: string;
					exchange: string;
					mic_code: string;
					type: string;
				};
				values: {
					datetime: string;
					open: string;
					high: string;
					low: string;
					close: string;
					volume: string;
				}[];
		  }
		| {
				status: "error";
				message: string;
				code: number;
				meta: { [K: string]: string };
		  };
}

interface QueryStocksProps {}

const stocks = (props: QueryStocksProps, options?: Partial<UseQueryOptions<QueryStocksResult, Error>>) => {
	return useQuery({
		queryKey: ["stocks", { ...props }],
		queryFn: async () => {
			const response = await fetch(`https://api.twelvedata.com/time_series?symbol=USD,GLD,EUR,AAPL&interval=1min&apikey=${API_KEY}`);

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			return response.json();
		},
		...options,
	});
};

export const QueryStocks = {
	symbols,
	stocks,
};
