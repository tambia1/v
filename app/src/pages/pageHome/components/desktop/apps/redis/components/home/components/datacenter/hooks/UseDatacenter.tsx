import { Search } from "@src/utils/Search";
import { useEffect, useState } from "react";
import { Api } from "../../../../../api/Api";
import { getRegionInfo } from "../../../../../api/Api.utils";
import { StoreUser } from "../../../../user/stores/StoreUser";
import type { DataCenterType, Filter } from "./../Datacenter.types";

type Props = {
	searchValue: string;
	filter: Filter;
};

export const UseDatacenter = ({ searchValue, filter }: Props) => {
	const [data, setData] = useState<DataCenterType[]>([]);
	const [dataToDisplay, setDataToDisplay] = useState<DataCenterType[]>([]);
	const [isDataReady, setIsDataReady] = useState(false);

	const storeUser = StoreUser();
	const queryPlans = Api.plan.quryPlans({ csrf: storeUser.csrf, only_customer_plans: true });
	const querySubs = Api.subscription.qurySubscriptions({ csrf: storeUser.csrf });
	const queryBdbs = Api.bdb.quryBdbs({ csrf: storeUser.csrf });
	const queryCrdbs = Api.crdb.quryCrdbs({ csrf: storeUser.csrf });
	const queryRegions = Api.region.quryRegions({ csrf: storeUser.csrf });

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
						? [{ ...getRegionInfo(regions.find((region) => region.name === plan.region)?.name || ""), cidr: "0.0.0.0" }]
						: sub.minimal_pricing_regions.map((subRegion) => ({
								...getRegionInfo(regions.find((region) => region.name === subRegion.region_name)?.name || ""),
								cidr: "1.1.1.1",
							})),
					redisOnFlash: plan.is_rof,
					multiAvailabilityZone: plan.is_multi_az,
					subPrice: 0,
					dbs:
						plan.plan_type === "aarcp"
							? crdbs
									.filter((crdb) => crdb.subscription === sub.id)
									.map((crdb) => ({
										collapsed: true,
										name: crdb.name,
										id: crdb.id,
										memorySize: crdb.memory_size_in_mb * 1024 * 1024,
										dbSize: (crdb.memory_size_in_mb * 1024 * 1024) / 4,
										usage: crdb.crdb_instances[0].usage,
										highAvailability: true,
										dataPersistence: crdb.default_db_config.data_persistence,
										shardCount: crdb.crdb_instances.reduce((pv, cv) => pv + cv.shards_count, 0),
										dbPrice: plan.price || sub.minimal_pricing_regions.reduce((pv, cv) => pv + cv.price, 0),
										modules: crdb.default_db_config.module_list.map((item) => item.module.capability_name),
									}))
							: bdbs
									.filter((bdb) => bdb.subscription === sub.id)
									.map((bdb) => ({
										collapsed: true,
										name: bdb.name,
										id: bdb.id,
										memorySize: bdb.size || plan.size,
										dbSize: bdb.replication ? (bdb.size || plan.size) / 2 : bdb.size || plan.size,
										usage: bdb.usage,
										highAvailability: bdb.replication,
										dataPersistence: bdb.data_persistence,
										shardCount: bdb.shard_type_pricing_bdb_regions?.[0].shards_count || 0,
										dbPrice: plan.price || sub.minimal_pricing_regions.reduce((pv, cv) => pv + cv.price, 0),
										modules: bdb.bdb_modules.map((item) => item.module.capability_name),
									})),
				};

				dataCenterItem.subPrice = dataCenterItem.dbs.reduce((pv, cv) => pv + cv.dbPrice, 0);

				newData.push(dataCenterItem);
			}
		});

		newData.sort((a, b) => b.id - a.id);

		setData(newData);
		setIsDataReady(true);
	}, [queryPlans.data, querySubs.data, queryBdbs.data, queryCrdbs.data, queryRegions.data]);

	useEffect(() => {
		if (searchValue !== "") {
			if (filter === "subs") {
				const newData = data.filter((sub) => Search.fuzzySearch(searchValue, sub.name).length > 0);

				setDataToDisplay(newData);
			} else if (filter === "dbs") {
				const newData = data.filter((sub) => sub.dbs.filter((db) => Search.fuzzySearch(searchValue, db.name).length > 0).length > 0);

				setDataToDisplay(newData);
			}
		} else {
			setDataToDisplay(data);
		}
	}, [data, searchValue, filter]);

	const collpseAll = () => {
		const collapseState = data.some((sub) => !sub.collapsed);

		setData(data.map((sub) => ({ ...sub, collapsed: collapseState, dbs: sub.dbs.map((db) => ({ ...db, collapsed: true })) })));
	};

	const collpseSub = (subId: number) => {
		setData(data.map((sub) => (sub.id === subId ? { ...sub, collapsed: !sub.collapsed } : sub)));
	};

	const collpseSubDbs = (subId: number) => {
		const collapseState = data.find((sub) => sub.id === subId)?.dbs.some((db) => !db.collapsed) ?? true;

		setData(data.map((sub) => (sub.id === subId ? { ...sub, dbs: sub.dbs.map((db) => ({ ...db, collapsed: collapseState })) } : sub)));
	};

	const collpseDb = (dbId: number) => {
		setData(data.map((sub) => ({ ...sub, dbs: sub.dbs.map((db) => (db.id === dbId ? { ...db, collapsed: !db.collapsed } : db)) })));
	};

	return {
		data: dataToDisplay,
		isDataReady,
		collpseAll,
		collpseSub,
		collpseSubDbs,
		collpseDb,
	};
};
