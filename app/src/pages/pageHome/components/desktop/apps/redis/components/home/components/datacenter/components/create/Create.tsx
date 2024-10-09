import { Counter } from "@src/components/counter/Counter";
import { Icon } from "@src/components/icon/Icon";
import { Select } from "@src/components/select/Select";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { useTranslation } from "react-i18next";
import { convertBytes } from "../../../../../../queries/Query.utils";
import { QueryPlans } from "../../../../../../queries/QueryPlans";
import { StoreUser } from "../../../../../user/stores/StoreUser";
import * as S from "./Create.styles";

export const Create = () => {
	const { t } = useTranslation();

	const storeUser = StoreUser();
	const queryPlans = QueryPlans.plans({ csrf: storeUser.csrf, only_customer_plans: false });
	const plans = queryPlans.data?.response?.plans || [];

	return (
		<S.Create>
			<Text size="l">{t(lang.redis.create.title)}</Text>

			<S.Spacer />
			<Select selectedIndex={0} onClickItem={() => {}}>
				<Select.Item>
					<Icon iconName="iconAmazon" />
				</Select.Item>
				<Select.Item>
					<Icon iconName="iconGoogle" />
				</Select.Item>
				<Select.Item>
					<Icon iconName="iconMicrosoft" />
				</Select.Item>
			</Select>

			<S.Spacer />
			<Counter min={0} max={12} val={0} />

			<S.Spacer />
			<Text size="m">Cloud vendors</Text>
			<S.Row>
				{Array.from(new Set(plans.map((plan) => plan.cloud.toLowerCase()))).map((cloud) => (
					<S.Col key={cloud}>{cloud}</S.Col>
				))}
			</S.Row>

			<S.Spacer />
			<Text size="m">Server size</Text>
			<S.Row>
				{Array.from(new Set(plans.map((plan) => convertBytes(plan.size, "biggest")))).map((size) => (
					<S.Col key={size}>{size}</S.Col>
				))}
			</S.Row>

			<S.Spacer />
			<Text size="m">Regions</Text>
			<S.Row>
				{Array.from(new Set(plans.map((plan) => plan.region))).map((size) => (
					<S.Col key={size}>{size}</S.Col>
				))}
			</S.Row>

			<S.Spacer />
			<Text size="m">Number of databases</Text>
			<S.Row>
				{Array.from(new Set(plans.map((plan) => plan.max_bdbs))).map((maxBdbs) => (
					<S.Col key={maxBdbs}>{maxBdbs}</S.Col>
				))}
			</S.Row>

			<S.Spacer />
			<Text size="m">High availability</Text>
			<S.Row>
				{Array.from(new Set(plans.map((plan) => (plan.is_multi_az ? "multi" : plan.replication === "default" ? "none" : "single")))).map(
					(highAvailability) => (
						<S.Col key={highAvailability}>{highAvailability}</S.Col>
					),
				)}
			</S.Row>

			<S.Spacer />
			<Text size="m">Data persistence</Text>
			<S.Row>
				{Array.from(new Set(plans.map((plan) => plan.data_persistence))).map((dataPersistence) => (
					<S.Col key={dataPersistence}>{dataPersistence}</S.Col>
				))}
			</S.Row>

			<S.Spacer />
			<Text size="m">Auto failover</Text>
			<S.Row>
				{Array.from(new Set(plans.map((plan) => String(plan.auto_failover)))).map((autoFailover) => (
					<S.Col key={autoFailover}>{autoFailover}</S.Col>
				))}
			</S.Row>

			<S.Spacer />
			<Text size="m">Max Connection</Text>
			<S.Row>
				{Array.from(new Set(plans.map((plan) => plan.max_connections || "unlimited"))).map((maxConnections) => (
					<S.Col key={maxConnections}>{maxConnections}</S.Col>
				))}
			</S.Row>
		</S.Create>
	);
};
