import styled from "styled-components";

export const Weather = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	padding: 1rem;
	box-sizing: border-box;
	gap: 1rem;
	overflow-y: auto;
	color: ${(props) => props.theme.color.secondary900};
	background-color: ${(props) => props.theme.color.secondary100};
`;

export const LoaderContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 200px;
`;

export const ErrorContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 200px;
	gap: 1rem;
	text-align: center;
	color: ${(props) => props.theme.color.danger600};
`;

export const CurrentWeatherCard = styled.div`
	background-color: ${(props) => props.theme.color.secondary200};
	border-radius: 1rem;
	padding: 1.5rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	border: 1px solid ${(props) => props.theme.color.secondary300};
`;

export const CurrentWeatherHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: 1rem;
`;

export const TemperatureSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const MainTemperature = styled.div`
	line-height: 1;

	/* Scale up the title variant for main temperature */
	& > div {
		font-size: 3rem !important;
	}
`;

export const WeatherDetails = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	gap: 1rem;
	margin-top: 1rem;
`;

export const WeatherDetailItem = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
`;

export const DetailLabel = styled.div`
	text-transform: uppercase;
	letter-spacing: 0.5px;
`;

export const HourlyForecastSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const HourlyForecastContainer = styled.div`
	display: flex;
	gap: 1rem;
	overflow-x: auto;
	padding: 0.5rem 0;

	&::-webkit-scrollbar {
		height: 6px;
	}

	&::-webkit-scrollbar-track {
		background: ${(props) => props.theme.color.secondary200};
		border-radius: 3px;
	}

	&::-webkit-scrollbar-thumb {
		background: ${(props) => props.theme.color.secondary400};
		border-radius: 3px;
	}

	&::-webkit-scrollbar-thumb:hover {
		background: ${(props) => props.theme.color.secondary500};
	}
`;

export const HourlyForecastCard = styled.div`
	background-color: ${(props) => props.theme.color.secondary100};
	border-radius: 0.75rem;
	padding: 1rem;
	min-width: 120px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
	border: 1px solid ${(props) => props.theme.color.secondary300};
	flex-shrink: 0;
`;

export const HourlyDetails = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
	text-align: center;
`;

export const LocationInfo = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	margin-bottom: 0.5rem;
`;

export const RefreshButton = styled.button`
	background: ${(props) => props.theme.color.secondary500};
	color: white;
	border: none;
	border-radius: 0.5rem;
	padding: 0.5rem 1rem;
	font-size: 0.9rem;
	cursor: pointer;
	transition: background-color 0.2s;

	&:hover {
		background: ${(props) => props.theme.color.secondary600};
		opacity: 0.9;
	}

	&:disabled {
		background: ${(props) => props.theme.color.secondary400};
		cursor: not-allowed;
	}
`;
