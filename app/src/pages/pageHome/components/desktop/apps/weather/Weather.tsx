import { Card } from "@src/components/card/Card";
import { Loader } from "@src/components/loader/Loader";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import { useCurrentLocationWeather } from "./hooks/UseCurrentLocationWeather";
import { getWeatherDescription } from "./utils/WeatherUtils";
import * as S from "./Weather.styles";

export const Weather = () => {
	const { locationQuery, weatherQuery, isLoading, error, data } = useCurrentLocationWeather();

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
	const next12Hours = hourly.time.slice(0, 12).map((time: string, index: number) => ({
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
				<Text variant="note" color="secondary700">
					📍 {data.latitude.toFixed(2)}°, {data.longitude.toFixed(2)}°
				</Text>
				<S.RefreshButton onClick={handleRefresh} disabled={isLoading}>
					{isLoading ? "..." : "↻"}
				</S.RefreshButton>
			</S.LocationInfo>

			<Card
				headerContent={
					<Text variant="header">
						<T>{lang.weather.currentConditions}</T>
					</Text>
				}
				bodyContent={
					<S.CurrentWeatherCard>
						<S.CurrentWeatherHeader>
							<S.TemperatureSection>
								<S.MainTemperature>
									<Text variant="title" color="secondary600">
										{Math.round(current.temperature_2m)}
									</Text>
									<Text variant="title" color="secondary600">
										{currentUnits.temperature_2m}
									</Text>
								</S.MainTemperature>
								<Text variant="header" color="secondary700">
									{getWeatherDescription(current.weather_code)}
								</Text>
								<Text variant="body" color="secondary600">
									<T>{lang.weather.feelsLike}</T>: {Math.round(current.apparent_temperature)}°{currentUnits.apparent_temperature}
								</Text>
							</S.TemperatureSection>
						</S.CurrentWeatherHeader>

						<S.WeatherDetails>
							<S.WeatherDetailItem>
								<S.DetailLabel>
									<Text variant="note" color="secondary600">
										<T>{lang.weather.humidity}</T>
									</Text>
								</S.DetailLabel>
								<Text variant="body" color="secondary800">
									{current.relative_humidity_2m}
									{currentUnits.relative_humidity_2m}
								</Text>
							</S.WeatherDetailItem>

							<S.WeatherDetailItem>
								<S.DetailLabel>
									<Text variant="note" color="secondary600">
										<T>{lang.weather.windSpeed}</T>
									</Text>
								</S.DetailLabel>
								<Text variant="body" color="secondary800">
									{current.wind_speed_10m} {currentUnits.wind_speed_10m} {formatWindDirection(current.wind_direction_10m)}
								</Text>
							</S.WeatherDetailItem>

							<S.WeatherDetailItem>
								<S.DetailLabel>
									<Text variant="note" color="secondary600">
										<T>{lang.weather.pressure}</T>
									</Text>
								</S.DetailLabel>
								<Text variant="body" color="secondary800">
									{Math.round(current.pressure_msl)} {currentUnits.pressure_msl}
								</Text>
							</S.WeatherDetailItem>

							<S.WeatherDetailItem>
								<S.DetailLabel>
									<Text variant="note" color="secondary600">
										<T>{lang.weather.visibility}</T>
									</Text>
								</S.DetailLabel>
								<Text variant="body" color="secondary800">
									{(current.visibility / 1000).toFixed(1)} km
								</Text>
							</S.WeatherDetailItem>

							<S.WeatherDetailItem>
								<S.DetailLabel>
									<Text variant="note" color="secondary600">
										<T>{lang.weather.uvIndex}</T>
									</Text>
								</S.DetailLabel>
								<Text variant="body" color="secondary800">
									{current.uv_index}
								</Text>
							</S.WeatherDetailItem>

							<S.WeatherDetailItem>
								<S.DetailLabel>
									<Text variant="note" color="secondary600">
										Cloud Cover
									</Text>
								</S.DetailLabel>
								<Text variant="body" color="secondary800">
									{current.cloud_cover}
									{currentUnits.cloud_cover}
								</Text>
							</S.WeatherDetailItem>
						</S.WeatherDetails>
					</S.CurrentWeatherCard>
				}
			/>

			<S.HourlyForecastSection>
				<Text variant="header" color="secondary800">
					<T>{lang.weather.hourlyForecast}</T>
				</Text>

				<S.HourlyForecastContainer>
					{next12Hours.map((hour: any, index: number) => (
						<S.HourlyForecastCardWrapper key={index}>
							<Card
								bodyContent={
									<S.HourlyForecastCard>
										<Text variant="note" color="secondary600">
											{formatTime(hour.time)}
										</Text>
										<Text variant="header" color="secondary800">
											{Math.round(hour.temperature)}°
										</Text>
										<Text variant="note" color="secondary600">
											{getWeatherDescription(hour.weatherCode)}
										</Text>
										<S.HourlyDetails>
											<Text variant="note" color="secondary600">
												🌧️ {hour.precipitationProbability}%
											</Text>
											<Text variant="note" color="secondary600">
												💨 {hour.windSpeed} {hourlyUnits.wind_speed_10m}
											</Text>
											<Text variant="note" color="secondary600">
												💧 {hour.humidity}%
											</Text>
										</S.HourlyDetails>
									</S.HourlyForecastCard>
								}
							/>
						</S.HourlyForecastCardWrapper>
					))}
				</S.HourlyForecastContainer>
			</S.HourlyForecastSection>
		</S.Weather>
	);
};
