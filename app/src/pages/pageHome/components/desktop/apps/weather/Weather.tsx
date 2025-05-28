import { Navigator } from "@src/components/navigator/Navigator";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import * as S from "./Weather.styles";
import { WeatherPage } from "./pages/WeatherPage";

export const Weather = () => {
	return (
		<S.Weather>
			<Navigator>
				<Navigator.Page id="weather" title={<T>{lang.weather.title}</T>}>
					<WeatherPage />
				</Navigator.Page>
			</Navigator>
		</S.Weather>
	);
};
