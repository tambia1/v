import * as S from "./Subscription.styles";
import { Text } from "@src/components/text/Text";
import { WorldMap } from "@src/components/worldMap/WorldMap";
import { lang } from "@src/locales/i18n";
import { useTranslation } from "react-i18next";
import { QuerySubscriptions } from "../../../user/queries/QuerySubscriptions";
import { StoreUser } from "../../../user/stores/StoreUser";
import { QueryRegions } from "../../../user/queries/QueryRegions";
import { Region, Subscription as SubscriptionType } from "../../../user/queries/Query.types";
import { useEffect, useState } from "react";
import { QueryPlans } from "../../../user/queries/QueryPlans";
import { Icon } from "@src/components/icon/Icon";
import { Loader } from "@src/components/loader/Loader";

type Props = {
	subscriptionId: number;
};

export const Subscription = ({ subscriptionId }: Props) => {
	const { t } = useTranslation();

	const storeUser = StoreUser();
	const queryPlans = QueryPlans.plans({ csrf: storeUser.csrf, only_customer_plans: true });
	const querySubs = QuerySubscriptions.subscriptions({ csrf: storeUser.csrf });
	const queryRegions = QueryRegions.regions({ csrf: storeUser.csrf });

	const [regions, setRegions] = useState<Region[]>([]);

	const [sub, setSub] = useState<SubscriptionType | null>(null);

	useEffect(() => {
		if (queryPlans.data?.error !== 0 || querySubs.data?.error !== 0 || queryRegions.data?.error !== 0) {
			return;
		}

		const newRegions: Region[] = [];

		const plans = queryPlans.data!.response!.plans!;
		const subs = querySubs.data!.response!.subscriptions!;
		const regions = queryRegions.data!.response!;

		const sub = subs.find((sub) => sub.id === subscriptionId)!;
		const plan = plans.find((plan) => plan.id === sub.plan)!;

		const region = regions.find((item) => item.name === plan.region);

		if (region) {
			newRegions.push(region);
		}

		for (let i = 0; i < sub.minimal_pricing_regions.length; i++) {
			const region = regions.find((item) => item.name === sub.minimal_pricing_regions[i].region_name);

			if (region) {
				newRegions.push(region);
			}
		}

		setRegions(newRegions);
		setSub(sub);
	}, [querySubs.data, queryPlans.data, queryRegions.data]);

	if (sub === null) {
		return (
			<S.Subscription>
				<Loader />
			</S.Subscription>
		);
	}

	return (
		<S.Subscription>
			<Text size="l">{t(lang.redis.subscription.title)}</Text>

			<S.Spacer />

			<S.Row>
				<Text size="m">ID:</Text>
				<Text size="m">{sub.id}</Text>
			</S.Row>

			<S.Row>
				<Text size="m">Cloud: </Text>
				<Icon iconName="iconAmazon" />
			</S.Row>

			<S.Spacer />
			<S.WorldMapContainer>
				<WorldMap
					map={<WorldMap.Map />}
					pins={regions.map((region) => {
						return (
							<WorldMap.Pin key={region.city_name} lng={region.longitude} lat={region.latitude}>
								<S.Pin>{region.city_name}</S.Pin>
							</WorldMap.Pin>
						);
					})}
				/>
			</S.WorldMapContainer>
		</S.Subscription>
	);
};
