import { Button } from "@src/components/button/Button";
import { Icon } from "@src/components/icon/Icon";
import { Input } from "@src/components/input/Input";
import { Loader } from "@src/components/loader/Loader";
import { Select } from "@src/components/select/Select";
import { Stepper } from "@src/components/stepper/Stepper";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Api } from "../../../../../../api/Api";
import { cloudMap, dataPersistenceMap, modulesMap } from "../../../../../../api/Api.types";
import { convertBytes } from "../../../../../../api/Api.utils";
import { plansAll } from "../../../../../../data/plansAll";
// import { plansAll } from "../../../../../../data/plansAll";
import { regions } from "../../../../../../data/regions";
import { StoreUser } from "../../../../../user/stores/StoreUser";
import * as S from "./Create.styles";

type ISelections = {
	dbName: string;
	cloud: keyof typeof cloudMap;
	flash: boolean;
	replicaZone: boolean;
	regions: string[];
	dbSize: number;
	replica: boolean;
	dataPersistence: keyof typeof dataPersistenceMap;
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
		dbName: Date.now().toString(16).toUpperCase(),
		cloud: "aws",
		flash: false,
		replicaZone: false,
		regions: ["us-east-1"],
		dbSize: 30 * 2 ** 20,
		replica: false,
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
		setSelections({ ...selections, flash: value === "true" });
	};

	const handleOnClickReplicationZone = (_index: number, value: string) => {
		setSelections({ ...selections, flash: value === "true" });
	};

	const handleOnClickReplica = (_index: number, value: string) => {
		setSelections({ ...selections, replica: value === "true" });
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
		const plans: string[] = plansAll.plans
			.filter((plan) => plan.cloud.toLowerCase() === selections.cloud.toLowerCase())
			.filter((plan) => selections.regions.includes(plan.region))
			.filter((plan) => plan.is_rof === selections.flash)
			.filter((plan) => plan.is_multi_az === selections.replicaZone)
			.filter((plan) => (plan.replication === "user-selection-in-memory" && selections.replica) || (plan.replication === "default" && !selections.replica))
			.filter((plan) => plan.data_persistence === selections.dataPersistence)
			.filter((plan) => plan.supports_redis_modules)
			.filter((plan) => plan.size === selections.dbSize)
			.map((plan) => `${plan.id} - ${plan.name}`);

		return plans.join(", ");
	};

	return (
		<S.Create>
			<Text>{t(lang.redis.create.title)}</Text>

			<S.Spacer />

			<S.Col>
				<S.Col>
					<S.Row>Matching Plans</S.Row>
					<S.Row>{getMatchingPlans(selections)}</S.Row>
				</S.Col>

				<S.Col>
					<S.Row>Database name</S.Row>
					<Input value={selections.dbName} onTextChange={handleOnTextChange} />
				</S.Col>

				<S.Col>
					<S.Row>Cloud</S.Row>
					<Select onClickItem={handleOnClickCloud}>
						<Select.Display>{cloudMap[selections.cloud as keyof typeof cloudMap]}</Select.Display>
						<Select.Items>
							{Object.keys(cloudMap).map((key) => (
								<Select.Items.Item key={key} value={key}>
									{cloudMap[key as keyof typeof cloudMap]}
								</Select.Items.Item>
							))}
						</Select.Items>
					</Select>
				</S.Col>

				<S.Col>
					<S.Row>Regions</S.Row>
					<Select onClickItem={handleOnClickRegion}>
						<Select.Display>{String(selections.regions.length === 1 ? selections.regions[0] : `${selections.regions.length}`)}</Select.Display>
						<Select.Items>
							{regions.map((region) => (
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
					<Select onClickItem={handleOnClickFlash}>
						<Select.Display>{String(selections.flash).toUpperCase()}</Select.Display>
						<Select.Items>
							{["true", "false"].map((flash) => (
								<Select.Items.Item key={flash} value={flash}>
									{flash.toUpperCase()}
								</Select.Items.Item>
							))}
						</Select.Items>
					</Select>
				</S.Col>

				<S.Col>
					<S.Row>Replication zone</S.Row>
					<Select onClickItem={handleOnClickReplicationZone}>
						<Select.Display>{String(selections.flash).toUpperCase()}</Select.Display>
						<Select.Items>
							{["true", "false"].map((replicationZone) => (
								<Select.Items.Item key={replicationZone} value={replicationZone}>
									{replicationZone.toUpperCase()}
								</Select.Items.Item>
							))}
						</Select.Items>
					</Select>
				</S.Col>

				<S.Col>
					<S.Row>Replica</S.Row>
					<Select onClickItem={handleOnClickReplica}>
						<Select.Display>{String(selections.replica).toUpperCase()}</Select.Display>
						<Select.Items>
							{["true", "false"].map((replica) => (
								<Select.Items.Item key={replica} value={replica}>
									{replica.toUpperCase()}
								</Select.Items.Item>
							))}
						</Select.Items>
					</Select>
				</S.Col>

				<S.Col>
					<S.Row>Data persistence</S.Row>
					<Select onClickItem={handleOnClickDataPersistence}>
						<Select.Display>{dataPersistenceMap[selections.dataPersistence as keyof typeof dataPersistenceMap]}</Select.Display>
						<Select.Items>
							{Object.keys(dataPersistenceMap).map((key) => (
								<Select.Items.Item key={key} value={key}>
									{dataPersistenceMap[key as keyof typeof dataPersistenceMap]}
								</Select.Items.Item>
							))}
						</Select.Items>
					</Select>
				</S.Col>

				<S.Col>
					<S.Row>Modules</S.Row>
					<Select onClickItem={handleOnClickModules}>
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

				<S.Col>
					<S.Row>Size</S.Row>
					<S.Row>
						<Input value={convertBytes(selections.dbSize, "biggest")} size="m" textAlign="center" />
						<Stepper onClickMinus={hanldeOnClickMinus} onClickPlus={hanldeOnClickPlus} />
					</S.Row>
				</S.Col>

				<S.Col>
					<Button variant="full" onClick={handleCreateBdb}>
						Create Subscription & Database
					</Button>
					{isLoading && <Loader />}
					{message && <Text>{message}</Text>}
				</S.Col>
			</S.Col>
		</S.Create>
	);
};
