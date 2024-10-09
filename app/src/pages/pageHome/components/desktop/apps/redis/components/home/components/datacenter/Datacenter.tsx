import { Collapsable } from "@src/components/collapsable/Collapsable";
import { Flag } from "@src/components/flag/Flag";
import type { IFlagName } from "@src/components/flag/Flag.types";
import { Icon } from "@src/components/icon/Icon";
import { Loader } from "@src/components/loader/Loader";
import { Navigator } from "@src/components/navigator/Navigator";
import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { type MouseEvent, useEffect, useState } from "react";
import type { Region } from "../../../../queries/Query.types";
import { convertBytes } from "../../../../queries/Query.utils";
import { QueryBdbs } from "../../../../queries/QueryBdbs";
import { QueryCrdbs } from "../../../../queries/QueryCrdbs";
import { QueryPlans } from "../../../../queries/QueryPlans";
import { QueryRegions } from "../../../../queries/QueryRegions";
import { QuerySubscriptions } from "../../../../queries/QuerySubscriptions";
import { StoreUser } from "../../../user/stores/StoreUser";
import * as S from "./Datacenter.styles";
import type { DataCenterType } from "./Datacenter.types";
import { Create } from "./components/create/Create";
import { Database } from "./components/database/Database";
import { Subscription } from "./components/subscription/Subscription";

const subsTitles = ["SUBSCRIPTION", "ID", "TYPE", "DB"];
const dbsTitles = ["DATABASE", "ID", "USAGE", ""];

export const Datacenter = () => {
	const navigator = useNavigator();
	const [data, setData] = useState<DataCenterType[]>([]);
	const [isDataReady, setIsDataReady] = useState(false);
	const [collapsed, setCollapsed] = useState<{ [subId: string]: boolean }>({});

	const storeUser = StoreUser();
	const queryPlans = QueryPlans.plans({ csrf: storeUser.csrf, only_customer_plans: true });
	const querySubs = QuerySubscriptions.subscriptions({ csrf: storeUser.csrf });
	const queryBdbs = QueryBdbs.bdbs({ csrf: storeUser.csrf });
	const queryCrdbs = QueryCrdbs.crdbs({ csrf: storeUser.csrf });
	const queryRegions = QueryRegions.regions({ csrf: storeUser.csrf });

	useEffect(() => {
		const plans = queryPlans.data?.response?.plans;
		const subs = querySubs.data?.response?.subscriptions;
		const bdbs = queryBdbs.data?.response?.bdbs;
		const crdbs = queryCrdbs.data?.response?.crdbs;
		const regions = queryRegions.data?.response;

		if (!plans || !subs || !bdbs || !crdbs || !regions) {
			return;
		}

		const newData: DataCenterType[] = [];
		const newCollapsed: { [K: string]: boolean } = {};

		subs.forEach((sub) => {
			const plan = plans.find((plan) => plan.id === sub.plan);

			if (plan) {
				newData.push({
					name: sub.name,
					id: sub.id,
					type: plan.plan_type,
					cloud: plan.cloud.toLocaleLowerCase(),
					regions: plan.region
						? ([regions.find((region) => region.name === plan.region)] as Region[])
						: (sub.minimal_pricing_regions.map((subRegion) => regions.find((region) => region.name === subRegion.region_name)) as Region[]),
					redisOnFlash: plan.is_rof,
					multiAvailabilityZone: plan.is_multi_az,
					dbs:
						plan.plan_type === "aarcp"
							? crdbs
									.filter((crdb) => crdb.subscription === sub.id)
									.map((crdb) => ({
										name: crdb.name,
										id: crdb.id,
										usage: crdb.crdb_instances[0].usage,
										size: crdb.memory_size_in_mb * 1024 * 1024,
										highAvailability: true,
										dataPersistence: "disabled",
									}))
							: bdbs
									.filter((bdb) => bdb.subscription === sub.id)
									.map((bdb) => ({
										name: bdb.name,
										id: bdb.id,
										usage: bdb.usage,
										size: bdb.size || plan.size,
										highAvailability: bdb.replication,
										dataPersistence: bdb.data_persistence,
									})),
				});

				newCollapsed[sub.id] = true;
			}
		});

		newData.sort((a, b) => b.id - a.id);

		setData(newData);
		setCollapsed(newCollapsed);
		setIsDataReady(true);
	}, [queryPlans.data, querySubs.data, queryBdbs.data, queryCrdbs.data, queryRegions.data]);

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
					<S.SubscriptionRow key={sub.id}>
						<S.SubscriptionsDataRow onClick={(e) => handleOnClickCollpse(e, sub.id)}>
							<S.IconCollapse $collapsed={collapsed[sub.id]}>
								<Icon iconName="iconArrowDownCircle" />
							</S.IconCollapse>
							<S.SubscriptionsText>{sub.name}</S.SubscriptionsText>
							<S.SubscriptionsText>{sub.id}</S.SubscriptionsText>
							<S.SubscriptionsText>
								{sub.type === "free" && <Icon iconName="iconStar" fill="yellow" />}
								{sub.type === "paid" && <Icon iconName="iconServerSingle" fill="lightGreen" />}
								{sub.type === "rcp" && <Icon iconName="iconServer" fill="gold" />}
								{sub.type === "aarcp" && <Icon iconName="iconGlobe" fill="cyan" />}
							</S.SubscriptionsText>
							<S.SubscriptionsText>{sub.dbs.length}</S.SubscriptionsText>
							<S.ColIcon onClick={(e) => handleOnClickSubscription(e, sub.id)}>
								<Icon iconName="iconArrowRightCircle" />
							</S.ColIcon>
						</S.SubscriptionsDataRow>

						<S.DatabasesList>
							<Collapsable collapsed={collapsed[sub.id]}>
								<S.SubscriptionsDetailsRow>
									<S.Row>
										<S.SubscriptionsDetailText>Vendor</S.SubscriptionsDetailText>
										{sub.cloud === "aws" && <Icon iconName="iconAmazon" size="1rem" />}
										{sub.cloud === "gcp" && <Icon iconName="iconGoogle" size="1rem" />}
										{sub.cloud === "azure" && <Icon iconName="iconMicrosoft" size="1rem" />}
									</S.Row>
									<S.Row>
										<S.SubscriptionsDetailText>Regions</S.SubscriptionsDetailText>
										{sub.regions.map((region) => (
											<Flag key={region.city_name} flagName={`${region.flag}` as IFlagName} />
										))}
									</S.Row>
									<S.Row>
										<S.SubscriptionsDetailText>Flash</S.SubscriptionsDetailText>
										{!sub.redisOnFlash && <Icon iconName="iconSquare" />}
										{sub.redisOnFlash && <Icon iconName="iconVSquare" />}
									</S.Row>
									<S.Row>
										<S.SubscriptionsDetailText>Replica zone</S.SubscriptionsDetailText>
										{!sub.multiAvailabilityZone && <Icon iconName="iconSquare" />}
										{sub.multiAvailabilityZone && <Icon iconName="iconVSquare" />}
									</S.Row>
								</S.SubscriptionsDetailsRow>

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

											<S.DatabasesRow>
												<S.Row>
													<S.DatabaseDetailText>Size</S.DatabaseDetailText>
													<S.DatabaseDetailText>{convertBytes(db.size, "mb")}</S.DatabaseDetailText>

													<S.DatabaseDetailText>Replica</S.DatabaseDetailText>
													{!db.highAvailability && <Icon iconName="iconSquare" />}
													{db.highAvailability && <Icon iconName="iconVSquare" />}

													<S.DatabaseDetailText>Data Persistence</S.DatabaseDetailText>
													{db.dataPersistence === "disabled" && <Icon iconName="iconSquare" />}
													{db.dataPersistence !== "disabled" && <Icon iconName="iconVSquare" />}
												</S.Row>
											</S.DatabasesRow>
										</S.Col>
									))}
								</S.Col>
							</Collapsable>
						</S.DatabasesList>

						<S.Row>
							<S.SubscriptionsLine />
						</S.Row>
					</S.SubscriptionRow>
				))}
			</S.SubscriptionsList>
		</S.Page>
	);
};
