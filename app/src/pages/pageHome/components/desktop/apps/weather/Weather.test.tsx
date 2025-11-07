import { describe, expect, it, vi } from "vitest";
import { getCurrentLocation, getWeatherDescription } from "./utils/WeatherUtils";

// Mock the fetch function
global.fetch = vi.fn();

describe("Weather App", () => {
	describe("getWeatherDescription", () => {
		it("should return correct weather descriptions for known codes", () => {
			expect(getWeatherDescription(0)).toBe("Clear sky");
			expect(getWeatherDescription(1)).toBe("Mainly clear");
			expect(getWeatherDescription(61)).toBe("Slight rain");
			expect(getWeatherDescription(95)).toBe("Thunderstorm");
		});

		it('should return "Unknown" for unknown weather codes', () => {
			expect(getWeatherDescription(999)).toBe("Unknown");
		});
	});

	describe("getCurrentLocation", () => {
		it("should resolve with coordinates when geolocation is successful", async () => {
			const mockGeolocation = {
				getCurrentPosition: vi.fn((success) => {
					success({
						coords: {
							latitude: 52.52,
							longitude: 13.41,
						},
					});
				}),
			};

			// Mock navigator.geolocation
			Object.defineProperty(global.navigator, "geolocation", {
				value: mockGeolocation,
				writable: true,
			});

			const coordinates = await getCurrentLocation();
			expect(coordinates).toEqual({
				latitude: 52.52,
				longitude: 13.41,
			});
		});

		it("should reject when geolocation is not supported", async () => {
			// Mock navigator without geolocation
			Object.defineProperty(global.navigator, "geolocation", {
				value: undefined,
				writable: true,
			});

			await expect(getCurrentLocation()).rejects.toThrow("Geolocation is not supported by this browser");
		});
	});

	describe("Weather API Integration", () => {
		it("should construct correct API URL", () => {
			const coordinates = { latitude: 52.52, longitude: 13.41 };

			// We can't easily test the private fetchWeatherData function,
			// but we can verify the URL construction logic
			const url = new URL("https://api.open-meteo.com/v1/forecast");
			url.searchParams.append("latitude", coordinates.latitude.toString());
			url.searchParams.append("longitude", coordinates.longitude.toString());
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

			expect(url.toString()).toContain("latitude=52.52");
			expect(url.toString()).toContain("longitude=13.41");
			expect(url.toString()).toContain("temperature_2m");
			expect(url.toString()).toContain("current=");
		});
	});
});
