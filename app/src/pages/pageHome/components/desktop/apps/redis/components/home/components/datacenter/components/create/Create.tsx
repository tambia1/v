import { Button } from "@src/components/button/Button";
import { Check } from "@src/components/check/Check";
import { Flag } from "@src/components/flag/Flag";
import type { FlagName } from "@src/components/flag/Flag.types";
import { Icon } from "@src/components/icon/Icon";
import { Input } from "@src/components/input/Input";
import { Loader } from "@src/components/loader/Loader";
import { Select } from "@src/components/select/Select";
import { Stepper } from "@src/components/stepper/Stepper";
import { Table } from "@src/components/table/Table";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Api } from "../../../../../../api/Api";
import { dataPersistenceMap, modulesMap } from "../../../../../../api/Api.types";
import { convertBytes } from "../../../../../../api/Api.utils";
import { plansAll } from "../../../../../../data/plansAll";
// import { plansAll } from "../../../../../../data/plansAll";
import { regions } from "../../../../../../data/regions";
import { StoreUser } from "../../../../../user/stores/StoreUser";
import * as S from "./Create.styles";

const listCloudMap = {
	all: "All",
	aws: "AWS",
	gcp: "GCP",
	azure: "Azure",
};

const listRegions = [{ id: -1, name: "All" }, ...regions];

const listDataPersistence = { all: "All", ...dataPersistenceMap };

type ISelections = {
	dbName: string;
	cloud: keyof typeof listCloudMap;
	flash: string;
	replicaZone: string;
	regions: string[];
	dbSize: number;
	replica: string;
	dataPersistence: keyof typeof listDataPersistence;
	modules: (keyof typeof modulesMap)[];
};

export const Create = () => {
	const { t } = useTranslation();

	const storeUser = StoreUser();
	const mutateCreateBdbd = Api.bdb.mutateCreateBdb();

	const queryPlans = Api.plan.quryPlans({ csrf: storeUser.csrf, only_customer_plans: true });
	const querySubs = Api.subscription.qurySubscriptions({ csrf: storeUser.csrf });
	const queryBdbs = Api.bdb.quryBdbs({ csrf: storeUser.csrf });
	const queryCrdbs = Api.crdb.quryCrdbs({ csrf: storeUser.csrf });
	const queryRegions = Api.region.quryRegions({ csrf: storeUser.csrf });

	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState("");

	const [selections, setSelections] = useState<ISelections>({
		dbName: `DB-${Date.now().toString(16).toUpperCase()}`,
		cloud: "aws",
		flash: "false",
		replicaZone: "false",
		regions: ["us-east-1"],
		dbSize: 30 * 2 ** 20,
		replica: "false",
		dataPersistence: "disabled",
		modules: ["bf", "rejson", "timeseries", "searchlight"],
	});

	const handleCreateBdb = async () => {
		setIsLoading(true);

		const mutateCreateBdbResult = await mutateCreateBdbd({
			csrf: storeUser.csrf,
			bdbName: "cache-M2YTGOOA",
			plan: 32190,
			dataPersistence: "disabled",
			replication: false,
			recurringPaymentInfo: 63492,
		});

		queryPlans.refetch();
		querySubs.refetch();
		queryBdbs.refetch();
		queryCrdbs.refetch();
		queryRegions.refetch();

		setIsLoading(false);

		setMessage(mutateCreateBdbResult.error === 0 ? "success" : "error");
	};

	const handleOnTextChange = (value: string) => {
		setSelections({ ...selections, dbName: value });
	};

	const handleOnClickCloud = (_index: number, value: string) => {
		setSelections({ ...selections, cloud: value as ISelections["cloud"] });
	};

	const handleOnClickFlash = (_index: number, value: string) => {
		setSelections({ ...selections, flash: value.toLocaleLowerCase() });
	};

	const handleOnClickReplicationZone = (_index: number, value: string) => {
		setSelections({ ...selections, replicaZone: value.toLocaleLowerCase() });
	};

	const handleOnClickReplica = (_index: number, value: string) => {
		setSelections({ ...selections, replica: value.toLocaleLowerCase() });
	};

	const handleOnClickDataPersistence = (_index: number, value: string) => {
		setSelections({ ...selections, dataPersistence: value as ISelections["dataPersistence"] });
	};

	const handleOnClickModules = (_index: number, value: string) => {
		const selectedModule = value as keyof typeof modulesMap;

		setSelections({
			...selections,
			modules: selections.modules.includes(selectedModule)
				? selections.modules.filter((module) => module !== selectedModule)
				: [...selections.modules, selectedModule],
		});
	};

	const handleOnClickRegion = (_index: number, value: string) => {
		setSelections({
			...selections,
			regions: selections.regions.includes(value) ? selections.regions.filter((region) => region !== value) : [...selections.regions, value],
		});
	};

	const hanldeOnClickMinus = () => {
		const dbSizes = Array.from(new Set(plansAll.plans.map((plan) => plan.size)));
		const dbSize = dbSizes[dbSizes.indexOf(selections.dbSize) - 1];

		if (dbSize) {
			setSelections({ ...selections, dbSize: dbSize });
		}
	};

	const hanldeOnClickPlus = () => {
		const dbSizes = Array.from(new Set(plansAll.plans.map((plan) => plan.size)));
		const dbSize = dbSizes[dbSizes.indexOf(selections.dbSize) + 1];

		if (dbSize) {
			setSelections({ ...selections, dbSize: dbSize });
		}
	};

	const getMatchingPlans = (selections: ISelections) => {
		const plans = plansAll.plans
			.filter((plan) => plan.cloud.toLowerCase() === selections.cloud.toLowerCase() || selections.cloud === "all")
			.filter((plan) => selections.regions.includes(plan.region) || selections.regions.includes("All"))
			.filter((plan) => selections.flash === String(plan.is_rof) || selections.flash === "all")
			.filter((plan) => selections.replicaZone === String(plan.is_multi_az) || selections.replicaZone === "all")
			.filter((plan) => (plan.replication === "default" && selections.replica) || selections.replica === "all")
			.filter((plan) => selections.dataPersistence === plan.data_persistence || selections.dataPersistence === "all")
			.filter((plan) => plan.supports_redis_modules && selections.modules.length !== 0)
			.filter((plan) => plan.size === selections.dbSize);

		return plans;
	};

	const mathces = getMatchingPlans(selections);

	const matchingPlansData = {
		cols: ["ID", "NAME", "CLOUD", "REGION", "FLASH", "ZONE", "REPLICA", "DATA PERSISTENCE", "MODULES"],
		rows: mathces.map((match) => [
			match.id,
			match.name,
			match.cloud,
			<Flag
				key={regions.find((region) => region.name === match.region)?.name as FlagName}
				flagName={`${regions.find((region) => region.name === match.region)?.flag}` as FlagName}
			/>,
			<Check key={String(match.is_rof)} checked={match.is_rof} />,
			<Check key={String(match.is_multi_az)} checked={match.is_multi_az} />,
			<Check key={match.replication} checked={match.replication === "default"} />,
			dataPersistenceMap[match.data_persistence.includes("aof") ? "aof:every_write" : "disabled"],
			<Check key={String(match.supports_redis_modules)} checked={match.supports_redis_modules} />,
		]),
	};

	return (
		<S.Create>
			<Text>{t(lang.redis.create.title)}</Text>

			<S.Spacer />

			<S.Col>
				<S.Col>
					<Button variant="styled" onClick={handleCreateBdb} size="content">
						Create
					</Button>
					{isLoading && <Loader />}
					{message && <Text>{message}</Text>}
				</S.Col>

				<S.Col>
					<S.Row>Matching Plans: {mathces.length}</S.Row>
					<S.TableContainer>
						<Table data={matchingPlansData} type="horizontal" />
					</S.TableContainer>
				</S.Col>

				<S.Col>
					<S.Row>Database name</S.Row>
					<Input value={selections.dbName} onTextChange={handleOnTextChange} size="xl" />
				</S.Col>

				<S.Col>
					<S.Row>Size</S.Row>
					<S.Row>
						<Input value={convertBytes(selections.dbSize, "biggest")} textAlign="center" size="xl" />
						<Stepper onClickMinus={hanldeOnClickMinus} onClickPlus={hanldeOnClickPlus} />
					</S.Row>
				</S.Col>

				<S.Col>
					<S.Row>Cloud</S.Row>
					<Select onClickItem={handleOnClickCloud} size="xl">
						<Select.Display>{listCloudMap[selections.cloud as keyof typeof listCloudMap]}</Select.Display>
						<Select.Items>
							{Object.keys(listCloudMap).map((key) => (
								<Select.Items.Item key={key} value={key}>
									{listCloudMap[key as keyof typeof listCloudMap]}
								</Select.Items.Item>
							))}
						</Select.Items>
					</Select>
				</S.Col>

				<S.Col>
					<S.Row>Regions</S.Row>
					<Select onClickItem={handleOnClickRegion} isCloseOnSelectItem={false} size="xl">
						<Select.Display>{String(selections.regions.length === 1 ? selections.regions[0] : `+ ${selections.regions.length} regions`)}</Select.Display>
						<Select.Items>
							{listRegions
								.sort((a, b) => a.name.localeCompare(b.name))
								.map((region) => (
									<Select.Items.Item key={region.id} value={region.name}>
										<Select.Items.Item.Text>{region.name}</Select.Items.Item.Text>
										{selections.regions.includes(region.name) && (
											<Select.Items.Item.Image>
												<Icon iconName="iconCheck" />
											</Select.Items.Item.Image>
										)}
									</Select.Items.Item>
								))}
						</Select.Items>
					</Select>
				</S.Col>

				<S.Col>
					<S.Row>Flash</S.Row>
					<Select onClickItem={handleOnClickFlash} size="xl">
						<Select.Display>{String(selections.flash).toUpperCase()}</Select.Display>
						<Select.Items>
							{["all", "true", "false"].map((flash) => (
								<Select.Items.Item key={flash} value={flash}>
									{flash.toUpperCase()}
								</Select.Items.Item>
							))}
						</Select.Items>
					</Select>
				</S.Col>

				<S.Col>
					<S.Row>Replication zone</S.Row>
					<Select onClickItem={handleOnClickReplicationZone} size="xl">
						<Select.Display>{String(selections.replicaZone).toUpperCase()}</Select.Display>
						<Select.Items>
							{["all", "true", "false"].map((replicationZone) => (
								<Select.Items.Item key={replicationZone} value={replicationZone}>
									{replicationZone.toUpperCase()}
								</Select.Items.Item>
							))}
						</Select.Items>
					</Select>
				</S.Col>

				<S.Col>
					<S.Row>Replica</S.Row>
					<Select onClickItem={handleOnClickReplica} size="xl">
						<Select.Display>{String(selections.replica).toUpperCase()}</Select.Display>
						<Select.Items>
							{["all", "true", "false"].map((replica) => (
								<Select.Items.Item key={replica} value={replica}>
									{replica.toUpperCase()}
								</Select.Items.Item>
							))}
						</Select.Items>
					</Select>
				</S.Col>

				<S.Col>
					<S.Row>Data persistence</S.Row>
					<Select onClickItem={handleOnClickDataPersistence} size="xl">
						<Select.Display>{listDataPersistence[selections.dataPersistence as keyof typeof listDataPersistence]}</Select.Display>
						<Select.Items>
							{Object.keys(listDataPersistence).map((key) => (
								<Select.Items.Item key={key} value={key}>
									{listDataPersistence[key as keyof typeof listDataPersistence]}
								</Select.Items.Item>
							))}
						</Select.Items>
					</Select>
				</S.Col>

				<S.Col>
					<S.Row>Modules</S.Row>
					<Select onClickItem={handleOnClickModules} size="xl">
						<Select.Display>{String(selections.modules.length === 1 ? selections.modules[0] : `${selections.modules.length}`)}</Select.Display>
						<Select.Items>
							{Object.keys(modulesMap).map((module) => (
								<Select.Items.Item key={module} value={module}>
									<Select.Items.Item.Text>{modulesMap[module as keyof typeof modulesMap]}</Select.Items.Item.Text>
									{selections.modules.includes(module as keyof typeof modulesMap) && (
										<Select.Items.Item.Image>
											<Icon iconName="iconCheck" />
										</Select.Items.Item.Image>
									)}
								</Select.Items.Item>
							))}
						</Select.Items>
					</Select>
				</S.Col>
			</S.Col>

			<S.Spacer />
		</S.Create>
	);
};
