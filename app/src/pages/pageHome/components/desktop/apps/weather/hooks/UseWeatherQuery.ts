import { type UseQueryOptions, useQuery } from "@tanstack/react-query";
import type { WeatherResponse, WeatherQueryProps } from '../types/Weather.types';
import { fetchWeatherData } from '../queries/WeatherApi';

export const useWeatherQuery = (props: WeatherQueryProps = {}, options?: Partial<UseQueryOptions<WeatherResponse, Error>>) => {
	const { coordinates, enabled = true } = props;

	return useQuery({
		queryKey: ["weather", coordinates],
		queryFn: () => {
			if (!coordinates) {
				throw new Error("Coordinates are required");
			}
			return fetchWeatherData(coordinates);
		},
		enabled: enabled && !!coordinates,
		staleTime: 10 * 60 * 1000, // 10 minutes
		gcTime: 30 * 60 * 1000, // 30 minutes (formerly cacheTime)
		retry: 3,
		retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
		...options,
	});
};