import { Flag } from "@src/components/flag/Flag";
import type { IFlagName } from "@src/components/flag/Flag.types";
import { Icon } from "@src/components/icon/Icon";
import { Loader } from "@src/components/loader/Loader";
import { Text } from "@src/components/text/Text";
import { WorldMap } from "@src/components/worldMap/WorldMap";
import { lang } from "@src/locales/i18n";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { regionsLocations } from "../../../../../../data/regionsLocations";
import type { Plan as PlanType, Region, Subscription as SubscriptionType } from "../../../../../../queries/Query.types";
import { QueryPlans } from "../../../../../../queries/QueryPlans";
import { QueryRegions } from "../../../../../../queries/QueryRegions";
import { QuerySubscriptions } from "../../../../../../queries/QuerySubscriptions";
import { StoreUser } from "../../../../../user/stores/StoreUser";
import * as S from "./Subscription.styles";

type Props = {
	subscriptionId: number;
};

export const Subscription = ({ subscriptionId }: Props) => {
	const { t } = useTranslation();

	const storeUser = StoreUser();
	const queryPlans = QueryPlans.plans({ csrf: storeUser.csrf, only_customer_plans: true });
	const querySubs = QuerySubscriptions.subscriptions({ csrf: storeUser.csrf });
	const queryRegions = QueryRegions.regions({ csrf: storeUser.csrf });

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
			<Text fontSize="header">{t(lang.redis.subscription.title)}</Text>

			<S.Spacer />

			<S.Row>
				<Text fontSize="body">ID:</Text>
				<Text fontSize="body">{sub.id}</Text>
			</S.Row>

			<S.Row>
				<Text fontSize="body">Cloud: </Text>
				{plan.cloud.toLocaleLowerCase() === "aws" && <Icon iconName="iconAmazon" />}
				{plan.cloud.toLocaleLowerCase() === "gcp" && <Icon iconName="iconGoogle" />}
				{plan.cloud.toLocaleLowerCase() === "azure" && <Icon iconName="iconMicrosoft" />}
			</S.Row>

			<S.Row>
				<Text fontSize="body">ROF: </Text>
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
									<Flag flagName={`${region.flag}` as IFlagName} />
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
