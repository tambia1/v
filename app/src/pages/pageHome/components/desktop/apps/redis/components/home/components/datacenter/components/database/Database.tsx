import { Icon } from "@src/components/icon/Icon";
import { Loader } from "@src/components/loader/Loader";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Bdb, Crdb, Plan, Subscription } from "../../../../../user/queries/Query.types";
import { convertBytes, getDbSize, getDetaPersistence, getHighAvailability } from "../../../../../user/queries/Query.utils";
import { QueryBdbs } from "../../../../../user/queries/QueryBdbs";
import { QueryCrdbs } from "../../../../../user/queries/QueryCrdbs";
import { QueryPlans } from "../../../../../user/queries/QueryPlans";
import { QuerySubscriptions } from "../../../../../user/queries/QuerySubscriptions";
import { StoreUser } from "../../../../../user/stores/StoreUser";
import * as S from "./Database.styles";

type Props = {
	databaseId: number;
};

export const Database = ({ databaseId }: Props) => {
	const { t } = useTranslation();

	const storeUser = StoreUser();
	const queryPlans = QueryPlans.plans({ csrf: storeUser.csrf, only_customer_plans: true });
	const querySubs = QuerySubscriptions.subscriptions({ csrf: storeUser.csrf });
	const queryBdbs = QueryBdbs.bdbs({ csrf: storeUser.csrf });
	const queryCrdbs = QueryCrdbs.crdbs({ csrf: storeUser.csrf });

	const [sub, setSub] = useState<Subscription | undefined>(undefined);
	const [plan, setPlan] = useState<Plan | undefined>(undefined);
	const [bdb, setBdb] = useState<Bdb | undefined>(undefined);
	const [crdb, setCrdb] = useState<Crdb | undefined>(undefined);

	useEffect(() => {
		const plans = queryPlans.data?.response?.plans || [];
		const subs = querySubs.data?.response?.subscriptions || [];
		const bdbs = queryBdbs.data?.response?.bdbs || [];
		const crdbs = queryCrdbs.data?.response?.crdbs || [];

		if (!plans.length && !subs.length && !bdbs.length && !crdbs.length) {
			return;
		}

		const bdb = bdbs.find((bdb) => bdb.id === databaseId);
		const crdb = crdbs.find((crdb) => crdb.id === databaseId);

		if (!bdb && !crdb) {
			return;
		}

		const sub = subs.find((sub) => sub.id === bdb?.subscription || crdb?.subscription);

		if (!sub) {
			return;
		}

		const plan = plans.find((plan) => plan.id === sub.plan);

		if (!plan) {
			return;
		}

		if (bdb) {
			setBdb(bdb);
		}

		if (crdb) {
			setCrdb(crdb);
		}

		setSub(sub);
		setPlan(plan);
	}, [queryPlans.data, querySubs.data, queryBdbs.data, queryCrdbs.data, databaseId]);

	if (!sub || !plan || (!bdb && !crdb)) {
		return (
			<S.Database>
				<Loader />
			</S.Database>
		);
	}

	return (
		<S.Database>
			<Text size="l">{t(lang.redis.database.title)}</Text>

			<S.Row>
				<Text size="m">Subscription ID:</Text>
				<Text size="m">{sub.id}</Text>
			</S.Row>

			<S.Row>
				<Text size="m">Database ID:</Text>
				<Text size="m">{bdb?.id || crdb?.id}</Text>
			</S.Row>

			<S.Row>
				<Icon iconName="iconRedis" size="3rem" />
				<Text size="m">{convertBytes(getDbSize({ bdb, crdb, plan }), "biggest")}</Text>
			</S.Row>

			<S.Row>
				<Icon iconName="iconDatabase" size="3rem" />
				<Text size="m">{getHighAvailability({ bdb, crdb, plan })}</Text>
			</S.Row>

			<S.Row>
				<Icon iconName="iconHardDrive" size="3rem" />
				<Text size="m">{getDetaPersistence({ bdb, crdb, plan })}</Text>
			</S.Row>
		</S.Database>
	);
};
