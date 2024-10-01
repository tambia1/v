import * as S from "./Create.styles";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { useTranslation } from "react-i18next";
import { StoreUser } from "../../../user/stores/StoreUser";
import { QueryPlans } from "../../../user/queries/QueryPlans";
import { convertBytes } from "../../Datacenter.utils";

export const Create = () => {
	const { t } = useTranslation();

	const storeUser = StoreUser();
	const queryPlans = QueryPlans.plans({ csrf: storeUser.csrf, only_customer_plans: false });
	const plans = queryPlans.data?.response?.plans || [];

	return (
		<S.Create>
			<Text size="l">{t(lang.redis.create.title)}</Text>

			<S.Spacer />
			<Text size="m">Cloud vendors</Text>
			<S.Row>
				{Array.from(new Set(plans.map((plan) => plan.cloud.toLowerCase()))).map((cloud) => (
					<S.Col>{cloud}</S.Col>
				))}
			</S.Row>

			<S.Spacer />
			<Text size="m">Server size</Text>
			<S.Row>
				{Array.from(new Set(plans.map((plan) => convertBytes(plan.size, "biggest")))).map((size) => (
					<S.Col>{size}</S.Col>
				))}
			</S.Row>

			<S.Spacer />
			<Text size="m">Regions</Text>
			<S.Row>
				{Array.from(new Set(plans.map((plan) => plan.region))).map((size) => (
					<S.Col>{size}</S.Col>
				))}
			</S.Row>

			<S.Spacer />
			<Text size="m">Number of databases</Text>
			<S.Row>
				{Array.from(new Set(plans.map((plan) => plan.max_bdbs))).map((maxBdbs) => (
					<S.Col>{maxBdbs}</S.Col>
				))}
			</S.Row>

			<S.Spacer />
			<Text size="m">High availability</Text>
			<S.Row>
				{Array.from(new Set(plans.map((plan) => (plan.is_multi_az ? "multi" : plan.replication === "default" ? "none" : "single")))).map((highAvailability) => (
					<S.Col>{highAvailability}</S.Col>
				))}
			</S.Row>

			<S.Spacer />
			<Text size="m">Data persistence</Text>
			<S.Row>
				{Array.from(new Set(plans.map((plan) => plan.data_persistence))).map((dataPersistence) => (
					<S.Col>{dataPersistence}</S.Col>
				))}
			</S.Row>

			<S.Spacer />
			<Text size="m">Auto failover</Text>
			<S.Row>
				{Array.from(new Set(plans.map((plan) => plan.auto_failover))).map((autoFailover) => (
					<S.Col>{String(autoFailover)}</S.Col>
				))}
			</S.Row>

			<S.Spacer />
			<Text size="m">Max Connection</Text>
			<S.Row>
				{Array.from(new Set(plans.map((plan) => plan.max_connections || "unlimited"))).map((maxConnections) => (
					<S.Col>{maxConnections}</S.Col>
				))}
			</S.Row>
		</S.Create>
	);
};
