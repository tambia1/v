import { Flag } from "@src/components/flag/Flag";
import type { FlagName } from "@src/components/flag/Flag.types";
import { Icon } from "@src/components/icon/Icon";
import { Loader } from "@src/components/loader/Loader";
import { Text } from "@src/components/text/Text";
import { WorldMap } from "@src/components/worldMap/WorldMap";
import { lang } from "@src/locales/i18n";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Api } from "../../../../../../api/Api";
import type { Plan as PlanType, Region, Subscription as SubscriptionType } from "../../../../../../api/Api.types";
import { regionsLocations } from "../../../../../../data/regionsLocations";
import { StoreUser } from "../../../../../user/stores/StoreUser";
import * as S from "./Subscription.styles";

type Props = {
	subscriptionId: number;
};

export const Subscription = ({ subscriptionId }: Props) => {
	const { t } = useTranslation();

	const storeUser = StoreUser();
	const queryPlans = Api.plan.quryPlans({ csrf: storeUser.csrf, only_customer_plans: true });
	const querySubs = Api.subscription.qurySubscriptions({ csrf: storeUser.csrf });
	const queryRegions = Api.region.quryRegions({ csrf: storeUser.csrf });

	const [sub, setSub] = useState<SubscriptionType | null>(null);
	const [regions, setRegions] = useState<Region[]>([]);
	const [plan, setPlan] = useState<PlanType | null>(null);

	useEffect(() => {
		const plans = queryPlans.data?.response?.plans;
		const subs = querySubs.data?.response?.subscriptions;
		const regions = queryRegions.data?.response;

		if (!plans || !subs || !regions) {
			return;
		}

		const newRegions: Region[] = [];

		const sub = subs.find((sub) => sub.id === subscriptionId);

		if (!sub) {
			return;
		}

		const plan = plans.find((plan) => plan.id === sub.plan);

		if (!plan) {
			return;
		}

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
		setPlan(plan);
	}, [querySubs.data, queryPlans.data, queryRegions.data, subscriptionId]);

	if (!sub || !plan) {
		return (
			<S.Subscription>
				<Loader />
			</S.Subscription>
		);
	}

	return (
		<S.Subscription>
			<Text variant="header">{t(lang.redis.subscription.title)}</Text>

			<S.Spacer />

			<S.Row>
				<Text>ID:</Text>
				<Text>{sub.id}</Text>
			</S.Row>

			<S.Row>
				<Text>Cloud: </Text>
				{plan.cloud.toLocaleLowerCase() === "aws" && <Icon iconName="iconAmazon" />}
				{plan.cloud.toLocaleLowerCase() === "gcp" && <Icon iconName="iconGoogle" />}
				{plan.cloud.toLocaleLowerCase() === "azure" && <Icon iconName="iconMicrosoft" />}
			</S.Row>

			<S.Row>
				<Text>ROF: </Text>
				{String(plan.is_rof)}
			</S.Row>

			<S.Spacer />
			<S.WorldMapContainer>
				<WorldMap
					map={<WorldMap.Map />}
					pins={regions.map((region) => {
						return (
							<WorldMap.Pin
								key={region.city_name}
								lng={regionsLocations[region.id as keyof typeof regionsLocations]?.longitude || 0}
								lat={regionsLocations[region.id as keyof typeof regionsLocations]?.latitude || 0}
							>
								<S.Pin>
									<Flag flagName={`${region.flag}` as FlagName} />
									{region.city_name}
								</S.Pin>
							</WorldMap.Pin>
						);
					})}
				/>
			</S.WorldMapContainer>
		</S.Subscription>
	);
};
