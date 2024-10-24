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
			<Text fontSize="header">{t(lang.redis.create.title)}</Text>

			<S.Spacer />
			<Select onClickItem={() => {}}>
				<Select.Display>
					<Icon iconName="iconAmazon" />
				</Select.Display>
				<Select.Items>
					<Select.Items.Item>
						<Icon iconName="iconAmazon" />
					</Select.Items.Item>
					<Select.Items.Item>
						<Icon iconName="iconGoogle" />
					</Select.Items.Item>
					<Select.Items.Item>
						<Icon iconName="iconMicrosoft" />
					</Select.Items.Item>
				</Select.Items>
			</Select>

			<S.Spacer />
			<Counter onClickMinus={() => {}} onClickPlus={() => {}}>
				0
			</Counter>

			<S.Spacer />
			<Text fontSize="body">Cloud vendors</Text>
			<S.Row>
				{Array.from(new Set(plans.map((plan) => plan.cloud.toLowerCase()))).map((cloud) => (
					<S.Col key={cloud}>{cloud}</S.Col>
				))}
			</S.Row>

			<S.Spacer />
			<Text fontSize="body">Server size</Text>
			<S.Row>
				{Array.from(new Set(plans.map((plan) => convertBytes(plan.size, "biggest")))).map((size) => (
					<S.Col key={size}>{size}</S.Col>
				))}
			</S.Row>

			<S.Spacer />
			<Text fontSize="body">Regions</Text>
			<S.Row>
				{Array.from(new Set(plans.map((plan) => plan.region))).map((size) => (
					<S.Col key={size}>{size}</S.Col>
				))}
			</S.Row>

			<S.Spacer />
			<Text fontSize="body">Number of databases</Text>
			<S.Row>
				{Array.from(new Set(plans.map((plan) => plan.max_bdbs))).map((maxBdbs) => (
					<S.Col key={maxBdbs}>{maxBdbs}</S.Col>
				))}
			</S.Row>

			<S.Spacer />
			<Text fontSize="body">High availability</Text>
			<S.Row>
				{Array.from(new Set(plans.map((plan) => (plan.is_multi_az ? "multi" : plan.replication === "default" ? "none" : "single")))).map((highAvailability) => (
					<S.Col key={highAvailability}>{highAvailability}</S.Col>
				))}
			</S.Row>

			<S.Spacer />
			<Text fontSize="body">Data persistence</Text>
			<S.Row>
				{Array.from(new Set(plans.map((plan) => plan.data_persistence))).map((dataPersistence) => (
					<S.Col key={dataPersistence}>{dataPersistence}</S.Col>
				))}
			</S.Row>

			<S.Spacer />
			<Text fontSize="body">Auto failover</Text>
			<S.Row>
				{Array.from(new Set(plans.map((plan) => String(plan.auto_failover)))).map((autoFailover) => (
					<S.Col key={autoFailover}>{autoFailover}</S.Col>
				))}
			</S.Row>

			<S.Spacer />
			<Text fontSize="body">Max Connection</Text>
			<S.Row>
				{Array.from(new Set(plans.map((plan) => plan.max_connections || "unlimited"))).map((maxConnections) => (
					<S.Col key={maxConnections}>{maxConnections}</S.Col>
				))}
			</S.Row>
		</S.Create>
	);
};
