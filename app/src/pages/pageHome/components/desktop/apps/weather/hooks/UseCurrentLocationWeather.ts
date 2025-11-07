import { type UseQueryOptions, useQuery } from "@tanstack/react-query";
import type { WeatherResponse } from "../types/Weather.types";
import { getCurrentLocation } from "../utils/WeatherUtils";
import { useWeatherQuery } from "./UseWeatherQuery";

export const useCurrentLocationWeather = (options?: Partial<UseQueryOptions<WeatherResponse, Error>>) => {
	const locationQuery = useQuery({
		queryKey: ["currentLocation"],
		queryFn: getCurrentLocation,
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
		retry: 2,
	});

	const weatherQuery = useWeatherQuery(
		{
			coordinates: locationQuery.data,
			enabled: !!locationQuery.data,
		},
		options,
	);

	return {
		locationQuery,
		weatherQuery,
		isLoading: locationQuery.isLoading || weatherQuery.isLoading,
		error: locationQuery.error || weatherQuery.error,
		data: weatherQuery.data,
	};
};
