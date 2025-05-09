import { Icon } from "@src/components/icon/Icon";
import { Loader } from "@src/components/loader/Loader";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Api } from "../../../../../../api/Api";
import type { Bdb, Crdb, Plan, Subscription } from "../../../../../../api/Api.types";
import { convertBytes, getDbSize } from "../../../../../../api/Api.utils";
import { StoreUser } from "../../../../../user/stores/StoreUser";
import * as S from "./Database.styles";

type Props = {
	databaseId: number;
};

export const Database = ({ databaseId }: Props) => {
	const { t } = useTranslation();

	const storeUser = StoreUser();
	const queryPlans = Api.plan.quryPlans({ csrf: storeUser.csrf, only_customer_plans: true });
	const querySubs = Api.subscription.qurySubscriptions({ csrf: storeUser.csrf });
	const queryBdbs = Api.bdb.quryBdbs({ csrf: storeUser.csrf });
	const queryCrdbs = Api.crdb.quryCrdbs({ csrf: storeUser.csrf });

	const [sub, setSub] = useState<Subscription | undefined>(undefined);
	const [plan, setPlan] = useState<Plan | undefined>(undefined);
	const [bdb, setBdb] = useState<Bdb | undefined>(undefined);
	const [crdb, setCrdb] = useState<Crdb | undefined>(undefined);

	useEffect(() => {
		const plans = queryPlans.data?.response?.plans;
		const subs = querySubs.data?.response?.subscriptions;
		const bdbs = queryBdbs.data?.response?.bdbs;
		const crdbs = queryCrdbs.data?.response?.crdbs;

		if (!plans || !subs || !bdbs || !crdbs) {
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
			<Text variant="header">{t(lang.redis.database.title)}</Text>

			<S.Row>
				<Text variant="body">Subscription ID:</Text>
				<Text variant="body">{sub.id}</Text>
			</S.Row>

			<S.Row>
				<Text variant="body">Database ID:</Text>
				<Text variant="body">{bdb?.id || crdb?.id}</Text>
			</S.Row>

			<S.Row>
				<Icon iconName="iconRedis" size="size250" />
				<Text variant="body">{convertBytes(getDbSize({ bdb, crdb, plan }), "biggest")}</Text>
			</S.Row>

			<S.Row>
				<Icon iconName="iconDatabase" size="size250" />
				<Text variant="body"> {crdb ? "true" : String(bdb?.replication)}</Text>
			</S.Row>

			<S.Row>
				<Icon iconName="iconHardDrive" size="size250" />
				<Text variant="body">{crdb ? "disabled" : String(bdb?.data_persistence)}</Text>
			</S.Row>
		</S.Database>
	);
};
