import { Button } from "@src/components/button/Button";
import { Icon } from "@src/components/icon/Icon";
import { Loader } from "@src/components/loader/Loader";
import { Select } from "@src/components/select/Select";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Api } from "../../../../../../api/Api";
import { cloudMap, type dataPersistenceMap, type modulesMap } from "../../../../../../api/Api.types";
// import { plansAll } from "../../../../../../data/plansAll";
import { regions } from "../../../../../../data/regions";
import { StoreUser } from "../../../../../user/stores/StoreUser";
import * as S from "./Create.styles";

type ISelections = {
	cloud: keyof typeof cloudMap;
	flash: boolean;
	replicaZone: boolean;
	regions: string[];
	dbSize: number;
	replica: boolean;
	dataPersistence: keyof typeof dataPersistenceMap;
	moduls: (keyof typeof modulesMap)[];
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
		cloud: "aws",
		flash: false,
		replicaZone: false,
		regions: [],
		dbSize: 30,
		replica: false,
		dataPersistence: "aof",
		moduls: ["bf", "rejson", "timeseries", "searchlight"],
	});

	console.log("aaa", selections);

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

	const handleOnClickVendor = (_index: number, value: string) => {
		setSelections({ ...selections, cloud: value as ISelections["cloud"] });
	};

	const handleOnClickFlash = (_index: number, value: string) => {
		setSelections({ ...selections, flash: value === "true" });
	};

	const handleOnClickReplicationZone = (_index: number, value: string) => {
		setSelections({ ...selections, flash: value === "true" });
	};

	const handleOnClickRegion = (_index: number, value: string) => {
		setSelections({
			...selections,
			regions: selections.regions.includes(value) ? selections.regions.filter((region) => region !== value) : [...selections.regions, value],
		});
	};

	return (
		<S.Create>
			<Text>{t(lang.redis.create.title)}</Text>

			<S.Spacer />

			<S.Col>
				<S.Col>
					<S.Row>Vendor</S.Row>
					<Select onClickItem={handleOnClickVendor}>
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
					<S.Row>Regions</S.Row>
					<Select onClickItem={handleOnClickRegion}>
						<Select.Display>{String(selections.regions.length === 1 ? selections.regions[0] : `${selections.regions.length}`)}</Select.Display>
						<Select.Items>
							{regions.map((region) => (
								<Select.Items.Item key={region.id} value={region.name}>
									<Select.Items.Item.Text>{region.name}</Select.Items.Item.Text>
									{selections.regions.includes(region.name) && (
										<Select.Items.Item.Image>
											<Icon iconName="iconCheck" />{" "}
										</Select.Items.Item.Image>
									)}
								</Select.Items.Item>
							))}
						</Select.Items>
					</Select>
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
