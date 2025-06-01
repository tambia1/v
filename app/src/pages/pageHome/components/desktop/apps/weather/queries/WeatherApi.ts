import type { LocationCoordinates, WeatherResponse } from '../types/Weather.types';

export const fetchWeatherData = async (coordinates: LocationCoordinates): Promise<WeatherResponse> => {
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
