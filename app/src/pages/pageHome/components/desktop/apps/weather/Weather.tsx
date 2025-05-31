import { Loader } from "@src/components/loader/Loader";
import { Text } from "@src/components/text/Text";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import * as S from "./Weather.styles";
import { QueryWeather, getWeatherDescription } from "./queries/QueryWeather";

export const Weather = () => {
	const { locationQuery, weatherQuery, isLoading, error, data } = QueryWeather.useCurrentLocationWeather();

	const formatTime = (timeString: string) => {
		const date = new Date(timeString);
		return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
	};

	const formatWindDirection = (degrees: number) => {
		const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
		const index = Math.round(degrees / 22.5) % 16;
		return directions[index];
	};

	const handleRefresh = () => {
		locationQuery.refetch();
		if (locationQuery.data) {
			weatherQuery.refetch();
		}
	};

	if (isLoading) {
		return (
			<S.Weather>
				<S.LoaderContainer>
					<Loader />
				</S.LoaderContainer>
			</S.Weather>
		);
	}

	if (error) {
		let errorMessage: string = lang.weather.error;

		if (locationQuery.error) {
			const geoError = locationQuery.error as unknown as GeolocationPositionError;
			if (geoError.code === 1) {
				errorMessage = lang.weather.locationPermissionDenied;
			} else {
				errorMessage = lang.weather.locationError;
			}
		}

		return (
			<S.Weather>
				<S.ErrorContainer>
					<Text color="danger600">
						<T>{errorMessage}</T>
					</Text>
					<S.RefreshButton onClick={handleRefresh}>Try Again</S.RefreshButton>
				</S.ErrorContainer>
			</S.Weather>
		);
	}

	if (!data) {
		return (
			<S.Weather>
				<S.ErrorContainer>
					<Text color="danger600">
						<T>{lang.weather.error}</T>
					</Text>
					<S.RefreshButton onClick={handleRefresh}>Refresh</S.RefreshButton>
				</S.ErrorContainer>
			</S.Weather>
		);
	}

	const current = data.current;
	const hourly = data.hourly;
	const currentUnits = data.current_units;
	const hourlyUnits = data.hourly_units;

	// Get next 12 hours of forecast
	const next12Hours = hourly.time.slice(0, 12).map((time, index) => ({
		time,
		temperature: hourly.temperature_2m[index],
		weatherCode: hourly.weather_code[index],
		precipitation: hourly.precipitation[index],
		humidity: hourly.relative_humidity_2m[index],
		windSpeed: hourly.wind_speed_10m[index],
		precipitationProbability: hourly.precipitation_probability[index],
	}));

	return (
		<S.Weather>
			<S.LocationInfo>
				📍 {data.latitude.toFixed(2)}°, {data.longitude.toFixed(2)}°
				<S.RefreshButton onClick={handleRefresh} disabled={isLoading}>
					{isLoading ? "..." : "↻"}
				</S.RefreshButton>
			</S.LocationInfo>

			<S.CurrentWeatherCard>
				<Text variant="header">
					<T>{lang.weather.currentConditions}</T>
				</Text>

				<S.CurrentWeatherHeader>
					<S.TemperatureSection>
						<S.MainTemperature>
							{Math.round(current.temperature_2m)}°{currentUnits.temperature_2m}
						</S.MainTemperature>
						<S.WeatherDescription>{getWeatherDescription(current.weather_code)}</S.WeatherDescription>
						<S.FeelsLike>
							<T>{lang.weather.feelsLike}</T>: {Math.round(current.apparent_temperature)}°{currentUnits.apparent_temperature}
						</S.FeelsLike>
					</S.TemperatureSection>
				</S.CurrentWeatherHeader>

				<S.WeatherDetails>
					<S.WeatherDetailItem>
						<S.DetailLabel>
							<T>{lang.weather.humidity}</T>
						</S.DetailLabel>
						<S.DetailValue>
							{current.relative_humidity_2m}
							{currentUnits.relative_humidity_2m}
						</S.DetailValue>
					</S.WeatherDetailItem>

					<S.WeatherDetailItem>
						<S.DetailLabel>
							<T>{lang.weather.windSpeed}</T>
						</S.DetailLabel>
						<S.DetailValue>
							{current.wind_speed_10m} {currentUnits.wind_speed_10m} {formatWindDirection(current.wind_direction_10m)}
						</S.DetailValue>
					</S.WeatherDetailItem>

					<S.WeatherDetailItem>
						<S.DetailLabel>
							<T>{lang.weather.pressure}</T>
						</S.DetailLabel>
						<S.DetailValue>
							{Math.round(current.pressure_msl)} {currentUnits.pressure_msl}
						</S.DetailValue>
					</S.WeatherDetailItem>

					<S.WeatherDetailItem>
						<S.DetailLabel>
							<T>{lang.weather.visibility}</T>
						</S.DetailLabel>
						<S.DetailValue>{(current.visibility / 1000).toFixed(1)} km</S.DetailValue>
					</S.WeatherDetailItem>

					<S.WeatherDetailItem>
						<S.DetailLabel>
							<T>{lang.weather.uvIndex}</T>
						</S.DetailLabel>
						<S.DetailValue>{current.uv_index}</S.DetailValue>
					</S.WeatherDetailItem>

					<S.WeatherDetailItem>
						<S.DetailLabel>Cloud Cover</S.DetailLabel>
						<S.DetailValue>
							{current.cloud_cover}
							{currentUnits.cloud_cover}
						</S.DetailValue>
					</S.WeatherDetailItem>
				</S.WeatherDetails>
			</S.CurrentWeatherCard>

			<S.HourlyForecastSection>
				<S.SectionTitle>
					<T>{lang.weather.hourlyForecast}</T>
				</S.SectionTitle>

				<S.HourlyForecastContainer>
					{next12Hours.map((hour, index) => (
						<S.HourlyForecastCard key={index}>
							<S.HourlyTime>{formatTime(hour.time)}</S.HourlyTime>
							<S.HourlyTemperature>{Math.round(hour.temperature)}°</S.HourlyTemperature>
							<S.HourlyDescription>{getWeatherDescription(hour.weatherCode)}</S.HourlyDescription>
							<S.HourlyDetails>
								<div>💧 {hour.precipitationProbability}%</div>
								<div>
									💨 {hour.windSpeed} {hourlyUnits.wind_speed_10m}
								</div>
								<div>💧 {hour.humidity}%</div>
							</S.HourlyDetails>
						</S.HourlyForecastCard>
					))}
				</S.HourlyForecastContainer>
			</S.HourlyForecastSection>
		</S.Weather>
	);
};
