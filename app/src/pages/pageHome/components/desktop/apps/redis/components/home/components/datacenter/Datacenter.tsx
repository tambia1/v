import { Collapsable } from "@src/components/collapsable/Collapsable";
import { Icon } from "@src/components/icon/Icon";
import { Loader } from "@src/components/loader/Loader";
import { Navigator } from "@src/components/navigator/Navigator";
import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { type MouseEvent, useEffect, useState } from "react";
import { QueryBdbs } from "../../../user/queries/QueryBdbs";
import { QueryCrdbs } from "../../../user/queries/QueryCrdbs";
import { QueryPlans } from "../../../user/queries/QueryPlans";
import { QuerySubscriptions } from "../../../user/queries/QuerySubscriptions";
import { StoreUser } from "../../../user/stores/StoreUser";
import * as S from "./Datacenter.styles";
import type { Sub } from "./Datacenter.types";
import { Create } from "./components/create/Create";
import { Database } from "./components/database/Database";
import { Subscription } from "./components/subscription/Subscription";

const subsTitles = ["SUBSCRIPTION", "ID", "TYPE", "DB"];
const dbsTitles = ["DATABASE", "ID", "USAGE", ""];

export const Datacenter = () => {
	const navigator = useNavigator();
	const [data, setData] = useState<Sub[]>([]);
	const [isDataReady, setIsDataReady] = useState(false);
	const [collapsed, setCollapsed] = useState<{ [subId: string]: boolean }>({});

	const storeUser = StoreUser();
	const queryPlans = QueryPlans.plans({ csrf: storeUser.csrf, only_customer_plans: true });
	const querySubs = QuerySubscriptions.subscriptions({ csrf: storeUser.csrf });
	const queryBdbs = QueryBdbs.bdbs({ csrf: storeUser.csrf });
	const queryCrdbs = QueryCrdbs.crdbs({ csrf: storeUser.csrf });

	useEffect(() => {
		const plans = queryPlans.data?.response?.plans || [];
		const subs = querySubs.data?.response?.subscriptions || [];
		const bdbs = queryBdbs.data?.response?.bdbs || [];
		const crdbs = queryCrdbs.data?.response?.crdbs || [];

		if (!plans.length && !subs.length && !bdbs.length && !crdbs.length) {
			return;
		}

		const newData: Sub[] = [];
		const newCollapsed: { [K: string]: boolean } = {};

		for (let i = 0; i < subs.length; i++) {
			const plan = plans.find((plan) => plan.id === subs[i].plan);

			if (plan) {
				newData.push({
					name: subs[i].name,
					id: subs[i].id,
					type: plan.plan_type,
					cloud: plan.cloud,
					dbs:
						plan.plan_type === "aarcp"
							? crdbs
									.filter((crdb) => crdb.subscription === subs[i].id)
									.map((crdb) => ({
										name: crdb.name,
										id: crdb.id,
										usage: crdb.crdb_instances[0].usage,
										size: crdb.memory_size_in_mb * 1024 * 1024,
									}))
							: bdbs
									.filter((bdb) => bdb.subscription === subs[i].id)
									.map((bdb) => ({
										name: bdb.name,
										id: bdb.id,
										usage: bdb.usage,
										size: bdb.size || plan.size,
									})),
				});

				newCollapsed[subs[i].id] = true;
			}
		}

		newData.sort((a, b) => b.id - a.id);

		setData(newData);
		setCollapsed(newCollapsed);
		setIsDataReady(true);
	}, [queryPlans.data, querySubs.data, queryBdbs.data, queryCrdbs.data]);

	const handleOnClickSubscription = (e: MouseEvent<HTMLDivElement>, subscriptionId: number) => {
		e.stopPropagation();

		navigator.pushPage(
			<Navigator.Page id="subscription" title={<T>{lang.redis.subscription.title}</T>}>
				<Subscription subscriptionId={subscriptionId} />
			</Navigator.Page>,
		);
	};

	const handleOnClickDatabase = (e: MouseEvent<HTMLDivElement>, databaseId: number) => {
		e.stopPropagation();

		navigator.pushPage(
			<Navigator.Page id="database" title={<T>{lang.redis.database.title}</T>}>
				<Database databaseId={databaseId} />
			</Navigator.Page>,
		);
	};

	const handleOnClickCollpse = (e: MouseEvent<HTMLDivElement>, subscriptionId: number) => {
		e.stopPropagation();

		setCollapsed({ ...collapsed, [subscriptionId]: !collapsed[subscriptionId] });
	};

	const handleOnClickCollpseAll = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();

		const collapseState = Object.keys(collapsed).some((subId) => !collapsed[subId]);

		setCollapsed({
			...Object.keys(collapsed).reduce(
				(acc, subId) => {
					acc[subId] = collapseState;
					return acc;
				},
				{} as { [subId: string]: boolean },
			),
		});
	};

	const handleOnClickCreate = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();

		navigator.pushPage(
			<Navigator.Page id="create" title={<T>{lang.redis.create.title}</T>}>
				<Create />
			</Navigator.Page>,
		);
	};

	if (!isDataReady) {
		return (
			<S.Page>
				<Loader />
			</S.Page>
		);
	}

	return (
		<S.Page>
			<S.SubscriptionsList>
				<S.SubscriptionsHeader>
					<S.ColIcon onClick={(e) => handleOnClickCollpseAll(e)}>
						<Icon iconName="iconMinusCircle" />
					</S.ColIcon>
					{subsTitles.map((col, index) => (
						<S.SubscriptionsText key={index}>{col}</S.SubscriptionsText>
					))}
					<S.ColIcon onClick={(e) => handleOnClickCreate(e)}>
						<Icon iconName="iconPlusCircle" />
					</S.ColIcon>
				</S.SubscriptionsHeader>

				{data.map((sub) => (
					<S.Col key={sub.id}>
						<S.SubscriptionsRow onClick={(e) => handleOnClickCollpse(e, sub.id)}>
							<S.IconCollapse $collapsed={collapsed[sub.id]}>
								<Icon iconName="iconArrowDownCircle" />
							</S.IconCollapse>
							<S.SubscriptionsText>{sub.name}</S.SubscriptionsText>
							<S.SubscriptionsText>{sub.id}</S.SubscriptionsText>
							<S.SubscriptionsText>
								{sub.type === "free" && <Icon iconName="iconStar" />}
								{sub.type === "paid" && <Icon iconName="iconServerSingle" />}
								{sub.type === "rcp" && <Icon iconName="iconServer" />}
								{sub.type === "aarcp" && <Icon iconName="iconGlobe" />}
							</S.SubscriptionsText>
							<S.SubscriptionsText>{sub.dbs.length}</S.SubscriptionsText>
							<S.ColIcon onClick={(e) => handleOnClickSubscription(e, sub.id)}>
								<Icon iconName="iconArrowRightCircle" />
							</S.ColIcon>
						</S.SubscriptionsRow>

						<S.DatabasesList>
							<Collapsable collapsed={collapsed[sub.id]}>
								<S.DatabasesHeader>
									{dbsTitles.map((col) => (
										<S.SubscriptionsText key={col}>{col}</S.SubscriptionsText>
									))}
								</S.DatabasesHeader>

								<S.Col>
									{sub.dbs.map((db) => (
										<S.Col key={db.id}>
											<S.Row>
												<S.DatabasesLine />
											</S.Row>

											<S.DatabasesRow>
												<S.DatabasesText>{db.name}</S.DatabasesText>
												<S.DatabasesText>{db.id}</S.DatabasesText>
												<S.DatabasesText>
													<S.Progress percent={Math.max(25, (db.usage / db.size) * 100)} />
												</S.DatabasesText>
												<S.ColIcon onClick={(e) => handleOnClickDatabase(e, db.id)}>
													<Icon iconName="iconChevronsRight" />
												</S.ColIcon>
											</S.DatabasesRow>
										</S.Col>
									))}
								</S.Col>
							</Collapsable>
						</S.DatabasesList>

						<S.Row>
							<S.SubscriptionsLine />
						</S.Row>
					</S.Col>
				))}
			</S.SubscriptionsList>
		</S.Page>
	);
};
