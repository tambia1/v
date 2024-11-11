import { Collapsable } from "@src/components/collapsable/Collapsable";
import { Flag } from "@src/components/flag/Flag";
import type { IFlagName } from "@src/components/flag/Flag.types";
import { Icon } from "@src/components/icon/Icon";
import { IconButton } from "@src/components/iconButton/IconButton";
import { Input } from "@src/components/input/Input";
import { Loader } from "@src/components/loader/Loader";
import { Navigator } from "@src/components/navigator/Navigator";
import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import { PopupMenu } from "@src/components/popupMenu/PopupMenu";
import { WorldMap } from "@src/components/worldMap/WorldMap";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { useState } from "react";
import { dataPersistenceMap } from "../../../../api/Api.types";
import { convertBytes } from "../../../../api/Api.utils";
import { regionsLocations } from "../../../../data/regionsLocations";
import * as S from "./Datacenter.styles";
import type { Filter } from "./Datacenter.types";
import { Create } from "./components/create/Create";
import { Database } from "./components/database/Database";
import { Subscription } from "./components/subscription/Subscription";
import { UseDatacenter } from "./hooks/UseDatacenter";

const subsTitles = ["SUBSCRIPTION", "ID", "TYPE", "DB"];
const dbsTitles = ["DATABASE", "ID", "USAGE"];

export const Datacenter = () => {
	const navigator = useNavigator();

	const [filter, setFilter] = useState<Filter>("subs");
	const [isFilterPopupMenuOpen, setIsPopupMenuOpen] = useState(false);

	const [searchValue, setSearchValue] = useState("");

	const { data, isDataReady, collpseAll, collpseSub, collpseSubDbs, collpseDb } = UseDatacenter({ searchValue, filter });

	const handleOnClickSubscription = (subscriptionId: number) => {
		navigator.pushPage(
			<Navigator.Page id="subscription" title={<T>{lang.redis.subscription.title}</T>}>
				<Subscription subscriptionId={subscriptionId} />
			</Navigator.Page>,
		);
	};

	const handleOnClickDatabase = (databaseId: number) => {
		navigator.pushPage(
			<Navigator.Page id="database" title={<T>{lang.redis.database.title}</T>}>
				<Database databaseId={databaseId} />
			</Navigator.Page>,
		);
	};

	const handleOnClickCollpseAll = () => {
		collpseAll();
	};

	const handleOnClickCollpseSub = (subId: number) => {
		collpseSub(subId);
	};

	const handleOnClickCollpseSubDbs = (subId: number) => {
		collpseSubDbs(subId);
	};

	const handleOnClickCollpseDb = (dbId: number) => {
		collpseDb(dbId);
	};

	const handleOnClickCreate = () => {
		navigator.pushPage(
			<Navigator.Page id="create" title={<T>{lang.redis.create.title}</T>}>
				<Create />
			</Navigator.Page>,
		);
	};

	const handleOnClickFilter = () => {
		setIsPopupMenuOpen(!isFilterPopupMenuOpen);
	};

	const handleOnTextChangeSearch = (value: string) => {
		setSearchValue(value);
	};

	const handleOnClicFilter = () => {
		setIsPopupMenuOpen(!isFilterPopupMenuOpen);
	};

	const handleOnClickFilterPopupMenuItem = (_index: number, value: string) => {
		setFilter(value as Filter);
		setIsPopupMenuOpen(false);
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
			<S.ListBar>
				<S.ListBarCell>
					<Icon iconName="iconSearch" />

					<Input value={searchValue} onTextChange={handleOnTextChangeSearch} />
				</S.ListBarCell>

				<S.ListBarCell>
					<IconButton iconName="iconFilter" onClick={handleOnClickFilter} />

					<S.ListBarFilter>
						<PopupMenu isOpen={isFilterPopupMenuOpen} checkedItem={filter} onClickItem={handleOnClickFilterPopupMenuItem} onClickOutside={handleOnClicFilter}>
							<PopupMenu.Item value="subs">Subscriptions</PopupMenu.Item>
							<PopupMenu.Item value="dbs">Databases</PopupMenu.Item>
						</PopupMenu>
					</S.ListBarFilter>
				</S.ListBarCell>
			</S.ListBar>

			<S.SubscriptionsList>
				<S.SubscriptionsHeader $visible={filter === "subs"}>
					<S.ColIcon onClick={() => handleOnClickCollpseAll()}>
						<Icon iconName="iconChevronsDown" />
					</S.ColIcon>
					{subsTitles.map((col, index) => (
						<S.SubscriptionsText key={index}>{col}</S.SubscriptionsText>
					))}
					<S.ColIcon onClick={() => handleOnClickCreate()}>
						<Icon iconName="iconPlusCircle" />
					</S.ColIcon>
				</S.SubscriptionsHeader>

				{data.map((sub) => (
					<S.SubscriptionRow key={sub.id}>
						<S.SubscriptionsDataRow $visible={filter === "subs"} onClick={() => handleOnClickCollpseSub(sub.id)}>
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
							<S.ColIcon onClick={() => handleOnClickSubscription(sub.id)}>
								<Icon iconName="iconArrowRightCircle" />
							</S.ColIcon>
						</S.SubscriptionsDataRow>

						<S.DatabasesList>
							<Collapsable collapsed={sub.collapsed && filter === "subs"}>
								<S.SubscriptionsDetailsRow $visible={filter === "subs"}>
									<S.Row>
										<S.SubscriptionsDetailText>Cloud</S.SubscriptionsDetailText>
										{sub.cloud === "aws" && <Icon iconName="iconAmazon" />}
										{sub.cloud === "gcp" && <Icon iconName="iconGoogle" />}
										{sub.cloud === "azure" && <Icon iconName="iconMicrosoft" />}
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

								<S.SubscriptionsDetailsRow $visible={filter === "subs"}>
									<S.Row>
										<S.SubscriptionsDetailText>Price</S.SubscriptionsDetailText>
										<S.SubscriptionsDetailText>$ {sub.subPrice}</S.SubscriptionsDetailText>
									</S.Row>
								</S.SubscriptionsDetailsRow>

								{sub.regions.length > 1 && (
									<S.SubscriptionsDetailsColMap $visible={filter === "subs"}>
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
																<S.RegionValue>{region.name}</S.RegionValue>
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
									<S.ColIcon onClick={() => handleOnClickCollpseSubDbs(sub.id)}>
										<Icon iconName="iconChevronsDown" />
									</S.ColIcon>
									{dbsTitles.map((col, index) => (
										<S.SubscriptionsText key={index}>{col}</S.SubscriptionsText>
									))}
									<S.ColIcon onClick={() => handleOnClickCreate()}>
										<Icon iconName="iconPlusCircle" />
									</S.ColIcon>
								</S.DatabasesHeader>

								<S.DatabasesRows>
									{sub.dbs.map((db) => (
										<S.Col key={db.id}>
											<S.Row>
												<S.DatabasesLine />
											</S.Row>

											<S.DatabasesRow onClick={() => handleOnClickCollpseDb(db.id)}>
												<S.IconCollapse $collapsed={db.collapsed}>
													<Icon iconName="iconChevronDown" />
												</S.IconCollapse>
												<S.DatabasesText>{db.name}</S.DatabasesText>
												<S.DatabasesText>{db.id}</S.DatabasesText>
												<S.DatabasesText>
													<S.Progress percent={Math.max(10, (db.usage / db.memorySize) * 100)} />
												</S.DatabasesText>
												<S.ColIcon onClick={() => handleOnClickDatabase(db.id)}>
													<Icon iconName="iconChevronRight" />
												</S.ColIcon>
											</S.DatabasesRow>

											<Collapsable collapsed={db.collapsed}>
												<S.DatabasesInfoRow>
													<S.DatabasesInfoCell>
														<S.DatabaseDetailText>Memory Size</S.DatabaseDetailText>
														<S.DatabaseDetailValue>{convertBytes(db.memorySize, "biggest")}</S.DatabaseDetailValue>
													</S.DatabasesInfoCell>

													<S.DatabasesInfoCell>
														<S.DatabaseDetailText>Usage</S.DatabaseDetailText>
														<S.DatabaseDetailValue>{convertBytes(db.usage, "biggest")}</S.DatabaseDetailValue>
													</S.DatabasesInfoCell>

													<S.DatabasesInfoCell>
														<S.DatabaseDetailValue>{Number(db.usage / db.memorySize).toFixed(3)}%</S.DatabaseDetailValue>
													</S.DatabasesInfoCell>
												</S.DatabasesInfoRow>

												<S.DatabasesInfoRow>
													<S.DatabasesInfoCell>
														<Icon iconName="iconRedis" />
														<S.DatabaseDetailText>DB Size</S.DatabaseDetailText>
														<S.DatabaseDetailValue>{convertBytes(db.dbSize, "biggest")}</S.DatabaseDetailValue>
													</S.DatabasesInfoCell>
												</S.DatabasesInfoRow>

												<S.DatabasesInfoRow>
													<S.DatabasesInfoCell>
														{db.highAvailability && <Icon iconName="iconRedisActivated" />}
														{!db.highAvailability && <Icon iconName="iconRedisDisabled" />}
														{db.highAvailability && <S.DatabaseDetailText>Replica Size</S.DatabaseDetailText>}
														{!db.highAvailability && <S.DatabaseDetailTextDisabled>Replica Size</S.DatabaseDetailTextDisabled>}
														{db.highAvailability && <S.DatabaseDetailValue>{convertBytes(db.dbSize, "biggest")}</S.DatabaseDetailValue>}
														{!db.highAvailability && <S.DatabaseDetailValue>None</S.DatabaseDetailValue>}
													</S.DatabasesInfoCell>
												</S.DatabasesInfoRow>

												<S.DatabasesInfoRow>
													<S.DatabasesInfoCell>
														{db.dataPersistence !== "disabled" && <Icon iconName="iconHardDrive" stroke="#ffffff" />}
														{db.dataPersistence === "disabled" && <Icon iconName="iconHardDrive" stroke="#666666" />}
														{db.dataPersistence !== "disabled" && <S.DatabaseDetailText>Data Persistence</S.DatabaseDetailText>}
														{db.dataPersistence === "disabled" && <S.DatabaseDetailTextDisabled>Data Persistence</S.DatabaseDetailTextDisabled>}
														<S.DatabaseDetailValue>{dataPersistenceMap[db.dataPersistence as keyof typeof dataPersistenceMap]}</S.DatabaseDetailValue>
													</S.DatabasesInfoCell>
												</S.DatabasesInfoRow>

												<S.DatabasesInfoRow>
													<S.DatabasesInfoCell>
														{db.modules.length > 0 && <S.DatabaseDetailText>Modules</S.DatabaseDetailText>}
														{db.modules.length === 0 && <S.DatabaseDetailTextDisabled>Modules</S.DatabaseDetailTextDisabled>}
														{db.modules.length === 0 && <S.DatabaseDetailValue>None</S.DatabaseDetailValue>}
														{<S.IconModule iconName="iconTrendingUp" $enabled={db.modules.includes("Probabilistic")} />}
														{<S.IconModule iconName="iconSettings" $enabled={db.modules.includes("JSON")} />}
														{<S.IconModule iconName="iconClock" $enabled={db.modules.includes("Time series")} />}
														{<S.IconModule iconName="iconSearch" $enabled={db.modules.includes("Search and query")} />}
													</S.DatabasesInfoCell>
												</S.DatabasesInfoRow>

												<S.DatabasesInfoRow>
													<S.DatabasesInfoCell>
														<S.DatabaseDetailText>Price</S.DatabaseDetailText>
														<S.DatabaseDetailValue>$ {db.dbPrice}</S.DatabaseDetailValue>
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
