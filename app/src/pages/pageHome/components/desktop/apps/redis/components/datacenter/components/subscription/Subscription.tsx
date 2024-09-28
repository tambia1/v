import { ILocation, Locations } from "@src/components/worldMap/data/locations";
import * as S from "./Subscription.styles";
import { Text } from "@src/components/text/Text";
import { WorldMap } from "@src/components/worldMap/WorldMap";
import { lang } from "@src/locales/i18n";
import { useTranslation } from "react-i18next";
import { Map } from "@src/components/worldMap/WorldMap.styles";

type Props = {
	subscriptionId: number;
};

export const Subscription = ({ subscriptionId }: Props) => {
	const { t } = useTranslation();

	return (
		<S.Subscription>
			<Text size="l">{t(lang.redis.subscription.title)}</Text>

			<S.Spacer />
			<Text size="m">subscription id {subscriptionId}</Text>

			<WorldMap
				map={<Map />}
				pins={Object.keys(Locations).map((key) => {
					const locationKey = key as ILocation;
					const location = Locations[locationKey];

					return (
						<WorldMap.Pin key={key} lng={location.lng} lat={location.lat}>
							{location.name}
						</WorldMap.Pin>
					);
				})}
			/>
		</S.Subscription>
	);
};
