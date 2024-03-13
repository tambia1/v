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
			return {
				USD: {
					meta: { symbol: "USD", interval: "1min", currency: "USD", exchange_timezone: "America/New_York", exchange: "NYSE", mic_code: "ARCX", type: "ETF" },
					values: [
						{ datetime: "2024-03-13 15:59:00", open: "98.12000", high: "98.17000", low: "98.08000", close: "98.09000", volume: "2985" },
						{ datetime: "2024-03-13 15:58:00", open: "98.15000", high: "98.23000", low: "98.15000", close: "98.16000", volume: "1767" },
						{ datetime: "2024-03-13 15:57:00", open: "98.02000", high: "98.06000", low: "97.97000", close: "98.06000", volume: "1197" },
						{ datetime: "2024-03-13 15:56:00", open: "97.80870", high: "97.96780", low: "97.68000", close: "97.96780", volume: "1157" },
						{ datetime: "2024-03-13 15:55:00", open: "97.90790", high: "97.90790", low: "97.90790", close: "97.90790", volume: "712" },
						{ datetime: "2024-03-13 15:54:00", open: "97.94000", high: "98.17000", low: "97.94000", close: "98.16000", volume: "1243" },
						{ datetime: "2024-03-13 15:53:00", open: "97.95610", high: "97.95610", low: "97.95610", close: "97.95610", volume: "604" },
						{ datetime: "2024-03-13 15:52:00", open: "98.01000", high: "98.01000", low: "97.85330", close: "97.98000", volume: "1615" },
						{ datetime: "2024-03-13 15:51:00", open: "98.00000", high: "98.04920", low: "97.90000", close: "97.90000", volume: "1638" },
						{ datetime: "2024-03-13 15:50:00", open: "98.35000", high: "98.35000", low: "98.23720", close: "98.23720", volume: "1261" },
						{ datetime: "2024-03-13 15:49:00", open: "98.25000", high: "98.48000", low: "98.22620", close: "98.47500", volume: "1182" },
						{ datetime: "2024-03-13 15:48:00", open: "98.32000", high: "98.36900", low: "98.32000", close: "98.33000", volume: "889" },
						{ datetime: "2024-03-13 15:47:00", open: "98.14000", high: "98.28000", low: "98.14000", close: "98.28000", volume: "535" },
						{ datetime: "2024-03-13 15:46:00", open: "97.70000", high: "98.08000", low: "97.70000", close: "98.08000", volume: "4093" },
						{ datetime: "2024-03-13 15:45:00", open: "98.02000", high: "98.02000", low: "97.80180", close: "97.80180", volume: "859" },
						{ datetime: "2024-03-13 15:44:00", open: "98.07000", high: "98.16000", low: "98.07000", close: "98.15990", volume: "535" },
						{ datetime: "2024-03-13 15:43:00", open: "97.94000", high: "97.98000", low: "97.94000", close: "97.98000", volume: "835" },
						{ datetime: "2024-03-13 15:42:00", open: "97.85000", high: "98.03000", low: "97.85000", close: "98.03000", volume: "590" },
						{ datetime: "2024-03-13 15:41:00", open: "97.80000", high: "97.90000", low: "97.80000", close: "97.90000", volume: "483" },
						{ datetime: "2024-03-13 15:40:00", open: "97.70000", high: "97.84000", low: "97.70000", close: "97.84000", volume: "3319" },
						{ datetime: "2024-03-13 15:39:00", open: "97.76000", high: "97.76000", low: "97.76000", close: "97.76000", volume: "102" },
						{ datetime: "2024-03-13 15:38:00", open: "97.85000", high: "97.85500", low: "97.69000", close: "97.69000", volume: "1024" },
						{ datetime: "2024-03-13 15:37:00", open: "98.09000", high: "98.12000", low: "97.72000", close: "97.81000", volume: "976" },
						{ datetime: "2024-03-13 15:36:00", open: "97.89190", high: "97.92000", low: "97.89190", close: "97.92000", volume: "439" },
						{ datetime: "2024-03-13 15:35:00", open: "97.85000", high: "97.85000", low: "97.85000", close: "97.85000", volume: "100" },
						{ datetime: "2024-03-13 15:34:00", open: "97.72000", high: "97.87000", low: "97.72000", close: "97.83000", volume: "700" },
						{ datetime: "2024-03-13 15:33:00", open: "97.71500", high: "97.86000", low: "97.62010", close: "97.75000", volume: "4344" },
						{ datetime: "2024-03-13 15:32:00", open: "98.01000", high: "98.01000", low: "97.65620", close: "97.65620", volume: "1114" },
						{ datetime: "2024-03-13 15:31:00", open: "98.22000", high: "98.22000", low: "97.95000", close: "98.08000", volume: "1748" },
						{ datetime: "2024-03-13 15:30:00", open: "97.92000", high: "98.26000", low: "97.92000", close: "98.26000", volume: "1582" },
					],
					status: "ok",
				},
				GLD: {
					meta: { symbol: "GLD", interval: "1min", currency: "USD", exchange_timezone: "America/New_York", exchange: "NYSE", mic_code: "ARCX", type: "ETF" },
					values: [
						{ datetime: "2024-03-13 15:59:00", open: "201.17000", high: "201.19000", low: "201.14000", close: "201.17999", volume: "100131" },
						{ datetime: "2024-03-13 15:58:00", open: "201.14000", high: "201.17999", low: "201.14000", close: "201.17500", volume: "46420" },
						{ datetime: "2024-03-13 15:57:00", open: "201.13000", high: "201.14000", low: "201.11000", close: "201.14000", volume: "57245" },
						{ datetime: "2024-03-13 15:56:00", open: "201.11501", high: "201.13499", low: "201.10001", close: "201.13499", volume: "76500" },
						{ datetime: "2024-03-13 15:55:00", open: "201.13499", high: "201.13499", low: "201.11000", close: "201.11501", volume: "30926" },
						{ datetime: "2024-03-13 15:54:00", open: "201.14000", high: "201.14999", low: "201.10001", close: "201.13499", volume: "51010" },
						{ datetime: "2024-03-13 15:53:00", open: "201.16499", high: "201.17500", low: "201.14000", close: "201.14000", volume: "38844" },
						{ datetime: "2024-03-13 15:52:00", open: "201.18500", high: "201.18500", low: "201.16000", close: "201.16499", volume: "18967" },
						{ datetime: "2024-03-13 15:51:00", open: "201.20000", high: "201.20000", low: "201.16499", close: "201.18500", volume: "17095" },
						{ datetime: "2024-03-13 15:50:00", open: "201.24001", high: "201.25000", low: "201.20000", close: "201.20500", volume: "20033" },
						{ datetime: "2024-03-13 15:49:00", open: "201.26500", high: "201.27000", low: "201.24001", close: "201.24001", volume: "12502" },
						{ datetime: "2024-03-13 15:48:00", open: "201.27499", high: "201.27499", low: "201.25000", close: "201.27000", volume: "27729" },
						{ datetime: "2024-03-13 15:47:00", open: "201.20000", high: "201.28000", low: "201.20000", close: "201.27000", volume: "18232" },
						{ datetime: "2024-03-13 15:46:00", open: "201.19000", high: "201.20000", low: "201.19000", close: "201.20000", volume: "10211" },
						{ datetime: "2024-03-13 15:45:00", open: "201.23000", high: "201.24001", low: "201.19000", close: "201.19000", volume: "13698" },
						{ datetime: "2024-03-13 15:44:00", open: "201.24170", high: "201.24719", low: "201.24001", close: "201.24001", volume: "4121" },
						{ datetime: "2024-03-13 15:43:00", open: "201.23500", high: "201.25000", low: "201.22501", close: "201.25000", volume: "9215" },
						{ datetime: "2024-03-13 15:42:00", open: "201.23000", high: "201.24001", low: "201.22000", close: "201.23000", volume: "14493" },
						{ datetime: "2024-03-13 15:41:00", open: "201.27000", high: "201.27000", low: "201.23500", close: "201.25000", volume: "9003" },
						{ datetime: "2024-03-13 15:40:00", open: "201.27000", high: "201.28500", low: "201.25000", close: "201.27000", volume: "26938" },
						{ datetime: "2024-03-13 15:39:00", open: "201.30659", high: "201.30659", low: "201.28000", close: "201.28500", volume: "7966" },
						{ datetime: "2024-03-13 15:38:00", open: "201.31000", high: "201.31000", low: "201.28999", close: "201.30000", volume: "4411" },
						{ datetime: "2024-03-13 15:37:00", open: "201.29201", high: "201.30510", low: "201.28000", close: "201.30510", volume: "6653" },
						{ datetime: "2024-03-13 15:36:00", open: "201.32001", high: "201.32001", low: "201.28999", close: "201.28999", volume: "23155" },
						{ datetime: "2024-03-13 15:35:00", open: "201.33000", high: "201.33000", low: "201.31000", close: "201.32001", volume: "11552" },
						{ datetime: "2024-03-13 15:34:00", open: "201.34500", high: "201.34500", low: "201.32001", close: "201.32001", volume: "7424" },
						{ datetime: "2024-03-13 15:33:00", open: "201.33501", high: "201.34500", low: "201.32500", close: "201.34000", volume: "10345" },
						{ datetime: "2024-03-13 15:32:00", open: "201.32500", high: "201.34000", low: "201.32001", close: "201.33000", volume: "10299" },
						{ datetime: "2024-03-13 15:31:00", open: "201.32500", high: "201.33000", low: "201.32001", close: "201.32500", volume: "9544" },
						{ datetime: "2024-03-13 15:30:00", open: "201.36000", high: "201.36000", low: "201.32001", close: "201.32001", volume: "5432" },
					],
					status: "ok",
				},
				EUR: {
					code: 404,
					message: "**symbol** EUR is not available with your plan. You may select the appropriate plan at https://twelvedata.com/pricing",
					status: "error",
					meta: { symbol: "USD,GLD,EUR,AAPL", interval: "1min", exchange: "" },
				},
				AAPL: {
					meta: { symbol: "AAPL", interval: "1min", currency: "USD", exchange_timezone: "America/New_York", exchange: "NASDAQ", mic_code: "XNGS", type: "Common Stock" },
					values: [
						{ datetime: "2024-03-13 15:59:00", open: "171.16499", high: "171.19000", low: "171.10001", close: "171.17000", volume: "786513" },
						{ datetime: "2024-03-13 15:58:00", open: "171.22501", high: "171.22501", low: "171.14000", close: "171.17000", volume: "427740" },
						{ datetime: "2024-03-13 15:57:00", open: "171.25999", high: "171.28500", low: "171.19099", close: "171.22000", volume: "389371" },
						{ datetime: "2024-03-13 15:56:00", open: "171.09000", high: "171.25999", low: "171.08000", close: "171.25999", volume: "300227" },
						{ datetime: "2024-03-13 15:55:00", open: "171.29500", high: "171.29500", low: "171.03999", close: "171.09500", volume: "380098" },
						{ datetime: "2024-03-13 15:54:00", open: "171.25000", high: "171.30000", low: "171.19000", close: "171.29401", volume: "290144" },
						{ datetime: "2024-03-13 15:53:00", open: "171.46001", high: "171.47000", low: "171.25000", close: "171.25000", volume: "230765" },
						{ datetime: "2024-03-13 15:52:00", open: "171.55000", high: "171.55499", low: "171.41000", close: "171.46500", volume: "196176" },
						{ datetime: "2024-03-13 15:51:00", open: "171.56000", high: "171.56000", low: "171.44000", close: "171.55499", volume: "182574" },
						{ datetime: "2024-03-13 15:50:00", open: "171.64999", high: "171.64999", low: "171.48219", close: "171.55499", volume: "213252" },
						{ datetime: "2024-03-13 15:49:00", open: "171.67000", high: "171.70500", low: "171.63000", close: "171.66000", volume: "209982" },
						{ datetime: "2024-03-13 15:48:00", open: "171.64999", high: "171.67999", low: "171.62000", close: "171.67000", volume: "101112" },
						{ datetime: "2024-03-13 15:47:00", open: "171.59801", high: "171.70000", low: "171.57500", close: "171.64500", volume: "156024" },
						{ datetime: "2024-03-13 15:46:00", open: "171.50999", high: "171.64000", low: "171.50999", close: "171.59500", volume: "121811" },
						{ datetime: "2024-03-13 15:45:00", open: "171.59000", high: "171.59000", low: "171.50000", close: "171.50999", volume: "91469" },
						{ datetime: "2024-03-13 15:44:00", open: "171.55000", high: "171.64999", low: "171.55000", close: "171.59500", volume: "98762" },
						{ datetime: "2024-03-13 15:43:00", open: "171.61000", high: "171.62000", low: "171.53000", close: "171.54781", volume: "131866" },
						{ datetime: "2024-03-13 15:42:00", open: "171.55000", high: "171.62000", low: "171.53000", close: "171.61000", volume: "317095" },
						{ datetime: "2024-03-13 15:41:00", open: "171.48500", high: "171.54500", low: "171.48000", close: "171.54500", volume: "70835" },
						{ datetime: "2024-03-13 15:40:00", open: "171.47000", high: "171.50000", low: "171.46500", close: "171.48500", volume: "104937" },
						{ datetime: "2024-03-13 15:39:00", open: "171.43500", high: "171.49001", low: "171.39999", close: "171.47569", volume: "85755" },
						{ datetime: "2024-03-13 15:38:00", open: "171.40311", high: "171.45500", low: "171.36000", close: "171.44000", volume: "80051" },
						{ datetime: "2024-03-13 15:37:00", open: "171.44501", high: "171.46761", low: "171.33000", close: "171.40401", volume: "187150" },
						{ datetime: "2024-03-13 15:36:00", open: "171.50999", high: "171.55000", low: "171.44000", close: "171.44991", volume: "87369" },
						{ datetime: "2024-03-13 15:35:00", open: "171.46870", high: "171.52499", low: "171.42999", close: "171.51010", volume: "95587" },
						{ datetime: "2024-03-13 15:34:00", open: "171.46001", high: "171.49001", low: "171.42000", close: "171.47000", volume: "98602" },
						{ datetime: "2024-03-13 15:33:00", open: "171.35001", high: "171.47099", low: "171.33501", close: "171.46001", volume: "99882" },
						{ datetime: "2024-03-13 15:32:00", open: "171.46001", high: "171.47000", low: "171.33000", close: "171.35001", volume: "107271" },
						{ datetime: "2024-03-13 15:31:00", open: "171.36501", high: "171.47000", low: "171.32500", close: "171.46500", volume: "129564" },
						{ datetime: "2024-03-13 15:30:00", open: "171.28000", high: "171.39999", low: "171.21001", close: "171.36771", volume: "221947" },
					],
					status: "ok",
				},
			};

			const response = await fetch(`https://api.twelvedata.com/time_series?symbol=USD,GLD,EUR,NASDAQ,AAPL,GOOG,MSFT,META,BTC&interval=1min&apikey=${API_KEY}`);

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const result = await response.json();

			return result;
		},
		...options,
	});
};

export const QueryStocks = {
	symbols,
	stocks,
};
