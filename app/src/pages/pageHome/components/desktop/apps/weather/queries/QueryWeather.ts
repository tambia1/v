import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

// Open-Meteo API response types
export type WeatherResponse = {
	latitude: number;
	longitude: number;
	generationtime_ms: number;
	utc_offset_seconds: number;
	timezone: string;
	timezone_abbreviation: string;
	elevation: number;
	current_units: {
		time: string;
		interval: string;
		temperature_2m: string;
		relative_humidity_2m: string;
		apparent_temperature: string;
		is_day: string;
		precipitation: string;
		weather_code: string;
		cloud_cover: string;
		pressure_msl: string;
		surface_pressure: string;
		wind_speed_10m: string;
		wind_direction_10m: string;
		wind_gusts_10m: string;
		visibility: string;
		uv_index: string;
	};
	current: {
		time: string;
		interval: number;
		temperature_2m: number;
		relative_humidity_2m: number;
		apparent_temperature: number;
		is_day: number;
		precipitation: number;
		weather_code: number;
		cloud_cover: number;
		pressure_msl: number;
		surface_pressure: number;
		wind_speed_10m: number;
		wind_direction_10m: number;
		wind_gusts_10m: number;
		visibility: number;
		uv_index: number;
	};
	hourly_units: {
		time: string;
		temperature_2m: string;
		relative_humidity_2m: string;
		apparent_temperature: string;
		precipitation_probability: string;
		precipitation: string;
		weather_code: string;
		cloud_cover: string;
		wind_speed_10m: string;
		wind_direction_10m: string;
		uv_index: string;
	};
	hourly: {
		time: string[];
		temperature_2m: number[];
		relative_humidity_2m: number[];
		apparent_temperature: number[];
		precipitation_probability: number[];
		precipitation: number[];
		weather_code: number[];
		cloud_cover: number[];
		wind_speed_10m: number[];
		wind_direction_10m: number[];
		uv_index: number[];
	};
};

export type LocationCoordinates = {
	latitude: number;
	longitude: number;
};

export type WeatherQueryProps = {
	coordinates?: LocationCoordinates;
	enabled?: boolean;
};

// Weather code descriptions based on WMO codes
export const getWeatherDescription = (code: number): string => {
	const weatherCodes: { [key: number]: string } = {
		0: "Clear sky",
		1: "Mainly clear",
		2: "Partly cloudy",
		3: "Overcast",
		45: "Fog",
		48: "Depositing rime fog",
		51: "Light drizzle",
		53: "Moderate drizzle",
		55: "Dense drizzle",
		56: "Light freezing drizzle",
		57: "Dense freezing drizzle",
		61: "Slight rain",
		63: "Moderate rain",
		65: "Heavy rain",
		66: "Light freezing rain",
		67: "Heavy freezing rain",
		71: "Slight snow fall",
		73: "Moderate snow fall",
		75: "Heavy snow fall",
		77: "Snow grains",
		80: "Slight rain showers",
		81: "Moderate rain showers",
		82: "Violent rain showers",
		85: "Slight snow showers",
		86: "Heavy snow showers",
		95: "Thunderstorm",
		96: "Thunderstorm with slight hail",
		99: "Thunderstorm with heavy hail",
	};

	return weatherCodes[code] || "Unknown";
};

// Function to get user's current location
export const getCurrentLocation = (): Promise<LocationCoordinates> => {
	return new Promise((resolve, reject) => {
		if (!navigator.geolocation) {
			reject(new Error("Geolocation is not supported by this browser"));
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				resolve({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				});
			},
			(error) => {
				reject(error);
			},
			{
				enableHighAccuracy: true,
				timeout: 10000,
				maximumAge: 300000, // 5 minutes
			},
		);
	});
};

// Fetch weather data from Open-Meteo API
const fetchWeatherData = async (coordinates: LocationCoordinates): Promise<WeatherResponse> => {
	const { latitude, longitude } = coordinates;

	const url = new URL("https://api.open-meteo.com/v1/forecast");
	url.searchParams.append("latitude", latitude.toString());
	url.searchParams.append("longitude", longitude.toString());
	url.searchParams.append(
		"current",
		[
			"temperature_2m",
			"relative_humidity_2m",
			"apparent_temperature",
			"is_day",
			"precipitation",
			"weather_code",
			"cloud_cover",
			"pressure_msl",
			"surface_pressure",
			"wind_speed_10m",
			"wind_direction_10m",
			"wind_gusts_10m",
			"visibility",
			"uv_index",
		].join(","),
	);
	url.searchParams.append(
		"hourly",
		[
			"temperature_2m",
			"relative_humidity_2m",
			"apparent_temperature",
			"precipitation_probability",
			"precipitation",
			"weather_code",
			"cloud_cover",
			"wind_speed_10m",
			"wind_direction_10m",
			"uv_index",
		].join(","),
	);
	url.searchParams.append("timezone", "auto");
	url.searchParams.append("forecast_days", "1");

	const response = await fetch(url.toString());

	if (!response.ok) {
		throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
	}

	return response.json();
};

// React Query hook for weather data
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
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
		...options,
	});
};

// Hook for getting current location and weather
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

export const QueryWeather = {
	useWeatherQuery,
	useCurrentLocationWeather,
	getCurrentLocation,
	getWeatherDescription,
};
