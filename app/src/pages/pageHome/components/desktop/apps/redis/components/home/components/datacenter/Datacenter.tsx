import { Collapsable } from "@src/components/collapsable/Collapsable";
import { Flag } from "@src/components/flag/Flag";
import type { IFlagName } from "@src/components/flag/Flag.types";
import { Icon } from "@src/components/icon/Icon";
import { Loader } from "@src/components/loader/Loader";
import { Navigator } from "@src/components/navigator/Navigator";
import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import { WorldMap } from "@src/components/worldMap/WorldMap";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { type MouseEvent, useEffect, useState } from "react";
import { regionsLocations } from "../../../../data/regionsLocations";
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

const dataPersistenceMap = {
	disabled: "Disabled",
	aof: "Append only file every 1 sec",
	"aof:every_write": "Append only file every write",
	"snapshot:3600": "Snapshot every 1 hour",
	"snapshot:21600": "Snapshot every 6 hour",
	"snapshot:43200": "Snapshot every 12 hour",
};

export const Datacenter = () => {
	const navigator = useNavigator();
	const [data, setData] = useState<DataCenterType[]>([]);
	const [isDataReady, setIsDataReady] = useState(false);

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

		subs.forEach((sub) => {
			const plan = plans.find((plan) => plan.id === sub.plan);

			if (plan) {
				const dataCenterItem: DataCenterType = {
					collapsed: true,
					id: sub.id,
					name: sub.name,
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
										collapsed: true,
										name: crdb.name,
										id: crdb.id,
										usage: crdb.crdb_instances[0].usage,
										size: crdb.memory_size_in_mb * 1024 * 1024,
										highAvailability: true,
										dataPersistence: crdb.default_db_config.data_persistence,
									}))
							: bdbs
									.filter((bdb) => bdb.subscription === sub.id)
									.map((bdb) => ({
										collapsed: true,
										name: bdb.name,
										id: bdb.id,
										usage: bdb.usage,
										size: bdb.size || plan.size,
										highAvailability: bdb.replication,
										dataPersistence: bdb.data_persistence,
									})),
				};

				newData.push(dataCenterItem);
			}
		});

		newData.sort((a, b) => b.id - a.id);

		setData(newData);
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

	const handleOnClickCollpseAll = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();

		const collapseState = data.some((sub) => !sub.collapsed);

		setData(data.map((sub) => ({ ...sub, collapsed: collapseState, dbs: sub.dbs.map((db) => ({ ...db, collapsed: true })) })));
	};

	const handleOnClickCollpseSub = (e: MouseEvent<HTMLDivElement>, subId: number) => {
		e.stopPropagation();

		setData(data.map((sub) => (sub.id === subId ? { ...sub, collapsed: !sub.collapsed } : sub)));
	};

	const handleOnClickCollpseSubDbs = (e: MouseEvent<HTMLDivElement>, subId: number) => {
		e.stopPropagation();

		const collapseState = data.find((sub) => sub.id === subId)?.dbs.some((db) => !db.collapsed) ?? true;

		setData(data.map((sub) => (sub.id === subId ? { ...sub, dbs: sub.dbs.map((db) => ({ ...db, collapsed: collapseState })) } : sub)));
	};

	const handleOnClickCollpseDb = (e: MouseEvent<HTMLDivElement>, dbId: number) => {
		e.stopPropagation();

		setData(data.map((sub) => ({ ...sub, dbs: sub.dbs.map((db) => (db.id === dbId ? { ...db, collapsed: !db.collapsed } : db)) })));
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
						<S.SubscriptionsDataRow onClick={(e) => handleOnClickCollpseSub(e, sub.id)}>
							<S.IconCollapse $collapsed={sub.collapsed}>
								<Icon iconName="iconArrowDownCircle" />
							</S.IconCollapse>
							<S.SubscriptionsText>{sub.name}</S.SubscriptionsText>
							<S.SubscriptionsText>{sub.id}</S.SubscriptionsText>
							<S.SubscriptionsText>
								{sub.type === "free" && <Icon iconName="iconStar" fill="yellow" />}
								{sub.type === "paid" && <Icon iconName="iconServerSingle" fill="lightGreen" />}
								{sub.type === "rcp" && <Icon iconName="iconGrid" fill="gold" />}
								{sub.type === "aarcp" && <Icon iconName="iconGlobe" fill="cyan" />}
							</S.SubscriptionsText>
							<S.SubscriptionsText>{sub.dbs.length}</S.SubscriptionsText>
							<S.ColIcon onClick={(e) => handleOnClickSubscription(e, sub.id)}>
								<Icon iconName="iconArrowRightCircle" />
							</S.ColIcon>
						</S.SubscriptionsDataRow>

						<S.DatabasesList>
							<Collapsable collapsed={sub.collapsed}>
								<S.SubscriptionsDetailsRow>
									<S.Row>
										<S.SubscriptionsDetailText>Vendor</S.SubscriptionsDetailText>
										{sub.cloud === "aws" && <Icon iconName="iconAmazon" size="1rem" />}
										{sub.cloud === "gcp" && <Icon iconName="iconGoogle" size="1rem" />}
										{sub.cloud === "azure" && <Icon iconName="iconMicrosoft" size="1rem" />}
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
									{sub.regions.length <= 1 && (
										<S.Row>
											<S.SubscriptionsDetailText>Region</S.SubscriptionsDetailText>
											{sub.regions.map((region) => (
												<Flag key={region.city_name} flagName={`${region.flag}` as IFlagName} />
											))}
										</S.Row>
									)}
								</S.SubscriptionsDetailsRow>
								{sub.regions.length > 1 && (
									<S.SubscriptionsDetailsColMap>
										<S.WorldMapContainer>
											<WorldMap
												map={<WorldMap.Map />}
												pins={sub.regions.map((region) => {
													return (
														<WorldMap.Pin
															key={region.city_name}
															lng={regionsLocations[region.id as keyof typeof regionsLocations]?.longitude || 0}
															lat={regionsLocations[region.id as keyof typeof regionsLocations]?.latitude || 0}
														>
															<S.Pin>
																<Flag flagName={`${region.flag}` as IFlagName} />
															</S.Pin>
														</WorldMap.Pin>
													);
												})}
											/>
										</S.WorldMapContainer>
									</S.SubscriptionsDetailsColMap>
								)}

								<S.DatabasesHeader>
									<S.ColIcon onClick={(e) => handleOnClickCollpseSubDbs(e, sub.id)}>
										<Icon iconName="iconMinusCircle" />
									</S.ColIcon>
									{dbsTitles.map((col, index) => (
										<S.SubscriptionsText key={index}>{col}</S.SubscriptionsText>
									))}
								</S.DatabasesHeader>

								<S.DatabasesRows>
									{sub.dbs.map((db) => (
										<S.Col key={db.id}>
											<S.Row>
												<S.DatabasesLine />
											</S.Row>

											<S.DatabasesRow onClick={(e) => handleOnClickCollpseDb(e, db.id)}>
												<S.IconCollapse $collapsed={db.collapsed}>
													<Icon iconName="iconChevronDown" />
												</S.IconCollapse>
												<S.DatabasesText>{db.name}</S.DatabasesText>
												<S.DatabasesText>{db.id}</S.DatabasesText>
												<S.DatabasesText>
													<S.Progress percent={Math.max(25, (db.usage / db.size) * 100)} />
												</S.DatabasesText>
												<S.ColIcon onClick={(e) => handleOnClickDatabase(e, db.id)}>
													<Icon iconName="iconChevronRight" />
												</S.ColIcon>
											</S.DatabasesRow>

											<Collapsable collapsed={db.collapsed}>
												<S.DatabasesInfoRow>
													<S.DatabasesInfoCell>
														<S.DatabaseDetailText>Size</S.DatabaseDetailText>
														<S.DatabaseDetailValue>{convertBytes(db.size, "biggest")}</S.DatabaseDetailValue>
													</S.DatabasesInfoCell>

													<S.DatabasesInfoCell>
														<S.DatabaseDetailText>Usage</S.DatabaseDetailText>
														<S.DatabaseDetailValue>{convertBytes(db.usage, "biggest")}</S.DatabaseDetailValue>
													</S.DatabasesInfoCell>

													<S.DatabasesInfoCell>
														<S.DatabaseDetailValue>{Number(db.usage / db.size).toFixed(3)}%</S.DatabaseDetailValue>
													</S.DatabasesInfoCell>
												</S.DatabasesInfoRow>

												<S.DatabasesInfoRow>
													<S.DatabasesInfoCell>
														<S.DatabaseDetailText>Replica</S.DatabaseDetailText>
														{!db.highAvailability && <Icon iconName="iconSquare" stroke="#A99D5D" />}
														{db.highAvailability && <Icon iconName="iconVSquare" stroke="#A99D5D" />}
													</S.DatabasesInfoCell>

													<S.DatabasesInfoCell>
														<S.DatabaseDetailText>HDD</S.DatabaseDetailText>
														{db.dataPersistence === "disabled" && <Icon iconName="iconSquare" stroke="#A99D5D" />}
														{db.dataPersistence !== "disabled" && <Icon iconName="iconVSquare" stroke="#A99D5D" />}
														{dataPersistenceMap[db.dataPersistence as keyof typeof dataPersistenceMap]}
													</S.DatabasesInfoCell>
												</S.DatabasesInfoRow>
											</Collapsable>
										</S.Col>
									))}
								</S.DatabasesRows>
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
