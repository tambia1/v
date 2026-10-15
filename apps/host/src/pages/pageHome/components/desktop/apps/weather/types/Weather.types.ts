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
