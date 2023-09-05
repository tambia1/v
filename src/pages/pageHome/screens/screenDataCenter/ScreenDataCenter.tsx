import { Box } from "@src/components/box/Box";
import { Canvas, drawArc, drawCircles, drawLines } from "@src/components/canvas/Canvas";
import { Server } from "@src/components/server/Server";
import { WorldMap, getWorldMapXY } from "@src/components/worldMap/WorldMap";
import { IDatabase, IServer, ISlot, servers as serversData } from "@src/data/data";
import { ILocation, Locations } from "@src/data/locations";
import { Flex } from "@src/styles/globalStyles";
import { getId } from "@src/utils/Id";
import { reactStringReplace } from "@src/utils/ReactStringReplace";
import { useEffect, useRef, useState } from "react";
import * as S from "./ScreenDataCenter.styles";
import * as DataUtils from "./ScreenDataCenterData.utils";
import { getDatabasesLinks, getServersLinks } from "./ScreenDataCenterLinks.utils";
import { getCost, getPlans } from "./ScreenDataCenterPlans.utils";
import { getTips } from "./ScreenDataCenterTips.utils";
import Flash from "./assets/flash.png";
import Disk from "./assets/harddisk.png";
import Primary from "./assets/ram_primary.png";
import Replica from "./assets/ram_replica.png";
import IconServer from "./assets/server.png";

interface Props {}

const MAP_WIDTH = 700;
const MAP_HEIGHT = 300;
const MAP_FIXW = -40;
const MAP_FIXH = 250;
const MAP_FIXX = -20;
const MAP_FIXY = 40;

export const ScreenDataCenter = ({}: Props) => {
	const [servers, setServers] = useState(structuredClone(serversData));

	const tips = getTips(servers);
	const plans = getPlans(servers);
	const cost = getCost(plans);

	const refServers = useRef<HTMLDivElement>(null);
	const [linksDatabases, setLinksDatabases] = useState(getDatabasesLinks(servers, refServers.current));
	const [linksServers, setLinksServers] = useState(getServersLinks(servers, refServers.current));

	useEffect(() => {
		setLinksDatabases(getDatabasesLinks(servers, refServers.current));
		setLinksServers(getServersLinks(servers, refServers.current));

		serversData.splice(0);
		servers.forEach((item) => serversData.push(item));
	}, [servers]);

	const handleOnclickAddServer = (location: ILocation) => {
		const newServers = structuredClone(servers);
		DataUtils.addServer(newServers, `server-${getId()}`, location);
		setServers(newServers);
	};

	const handleOnClickDeleteServer = (serverToDelete: IServer) => {
		const newServers = structuredClone(servers);
		DataUtils.deleteServer(newServers, serverToDelete);
		setServers(newServers);
	};

	const handleOnClickAddDatabase = (server: IServer, slot: ISlot) => {
		const newServers = structuredClone(servers);
		const newServer = DataUtils.getServer(newServers, server.name)!;
		DataUtils.addDatabase(newServer, slot, `db-${getId()}`, 10);
		setServers(newServers);
	};

	const handleOnClickDeleteDatabase = (server: IServer, databaseToDelete: IDatabase, slot: ISlot) => {
		const newServers = structuredClone(servers);
		DataUtils.deleteDatabase(newServers, databaseToDelete);
		setServers(newServers);
	};

	const handleOnClickDisconnect = (server: IServer, database: IDatabase, slot: ISlot) => {
		const newServers = structuredClone(servers);
		const newDatabase = DataUtils.getDatabase(newServers, database.name)!;
		newDatabase.link = "";
		setServers(newServers);
	};

	const handleOnDrag = (e: React.DragEvent, server: IServer, database: IDatabase, slot: ISlot) => {
		e.dataTransfer.setData("serverName", server.name);
		e.dataTransfer.setData("databaseName", database.name);
		e.dataTransfer.setData("slotName", slot);
	};

	const handleOnDrop = (e: React.DragEvent, server: IServer, database: IDatabase | null, slot: ISlot) => {
		e.stopPropagation();

		const srcServerName = e.dataTransfer.getData("serverName") as string;
		const srcDatabaseName = e.dataTransfer.getData("databaseName") as string;
		const srcSlotName = e.dataTransfer.getData("slotName") as ISlot;

		const newServers = structuredClone(servers);

		const serverSrc = DataUtils.getServer(newServers, srcServerName);
		const serverTrg = DataUtils.getServer(newServers, server.name);

		if (serverSrc && serverTrg && database) {
			const databaseSrc = DataUtils.getDatabase(newServers, srcDatabaseName);
			const databaseTrg = DataUtils.getDatabase(newServers, database.name);

			if (databaseSrc && databaseTrg && databaseSrc !== databaseTrg) {
				databaseSrc.link = databaseTrg.name;
				setServers(newServers);
			}
		} else if (serverSrc && serverTrg) {
			const database = DataUtils.getDatabase(newServers, srcDatabaseName)!;

			if (database) {
				serverSrc.slots[srcSlotName] = serverSrc.slots[srcSlotName].filter((item) => item.name != database.name);
				serverTrg.slots[slot].push(database);
				setServers(newServers);
			}
		}
	};

	const handleOnClickMemory = (server: IServer, database: IDatabase, slot: ISlot, size: number) => {
		const newServers = structuredClone(servers);
		const newDatabase = DataUtils.getDatabase(newServers, database.name)!;

		newDatabase.size = size;

		setServers(newServers);
	};

	const ServerDevice = (server: IServer, slot: ISlot) => {
		const titles: { [K in ISlot]: string } = {
			primary: "Primary",
			replica: "Replica",
			flash: "Flash",
			disk: "Disk",
		};

		const icons: { [K in ISlot]: string } = {
			primary: Primary,
			replica: Replica,
			flash: Flash,
			disk: Disk,
		};

		return (
			<Server.Device
				title={titles[slot]}
				text=""
				icon={icons[slot]}
				onClickAdd={() => {
					handleOnClickAddDatabase(server, slot);
				}}
				onDrop={(e) => {
					handleOnDrop(e, server, null, slot);
				}}
			>
				{server.slots[slot].map((database) => (
					<Server.Device.Database
						name={database.name}
						key={database.name}
						title={database.name}
						text={`(${database.link})`}
						memorySize={database.size}
						slot={slot}
						onClickDelete={() => {
							handleOnClickDeleteDatabase(server, database, slot);
						}}
						onClickMemory={(size) => {
							handleOnClickMemory(server, database, slot, size);
						}}
						onDragStart={(e) => {
							handleOnDrag(e, server, database, slot);
						}}
						onDrop={(e) => {
							handleOnDrop(e, server, database, slot);
						}}
						onClickDisconnect={() => {
							handleOnClickDisconnect(server, database, slot);
						}}
						onMouseEnter={() => {
							const elmSrc = document.querySelector(`div[data-name="${database.name}"]`) as HTMLElement;
							const elmTrg = document.querySelector(`div[data-name="${database.link}"]`) as HTMLElement;

							elmSrc?.setAttribute("data-link", "src");
							elmTrg?.setAttribute("data-link", "trg");
						}}
						onMouseLeave={() => {
							const elmSrc = document.querySelector(`div[data-name="${database.name}"]`) as HTMLElement;
							const elmTrg = document.querySelector(`div[data-name="${database.link}"]`) as HTMLElement;

							elmSrc?.setAttribute("data-link", "none");
							elmTrg?.setAttribute("data-link", "none");
						}}
					/>
				))}
			</Server.Device>
		);
	};

	return (
		<S.Container>
			<S.WorldMapContainer>
				<S.WorldMapCanvas>
					<Canvas
						key={JSON.stringify(linksServers)}
						draw={(ctx) => {
							ctx.save();

							linksServers.forEach((link) => {
								const locationA = Locations[link.from];
								const locationB = Locations[link.to];
								const coordsA = getWorldMapXY(locationA.lng, locationA.lat, MAP_WIDTH, MAP_HEIGHT, MAP_FIXW, MAP_FIXH, MAP_FIXX, MAP_FIXY);
								const coordsB = getWorldMapXY(locationB.lng, locationB.lat, MAP_WIDTH, MAP_HEIGHT, MAP_FIXW, MAP_FIXH, MAP_FIXX, MAP_FIXY);
								let a = { x: coordsA.x, y: coordsA.y };
								let b = { x: coordsB.x, y: coordsB.y };

								if (a.x > b.x) {
									[a, b] = [b, a];
								}

								drawArc(ctx, a, b, "#00ff00");
							});

							ctx.restore();
						}}
					/>
				</S.WorldMapCanvas>

				<WorldMap
					map={<S.WorldMap />}
					mapWidth={MAP_WIDTH}
					mapHeight={MAP_HEIGHT}
					mapFixW={MAP_FIXW}
					mapFixH={MAP_FIXH}
					mapFixX={MAP_FIXX}
					mapFixY={MAP_FIXY}
					pins={Object.keys(Locations).map((key) => {
						const locationKey = key as ILocation;
						const location = Locations[locationKey];

						return (
							<WorldMap.Pin key={key} lng={location.lng} lat={location.lat}>
								<S.WorldMapPin $isSelected={false} onClick={() => handleOnclickAddServer(locationKey)}>
									{location.name}
								</S.WorldMapPin>
							</WorldMap.Pin>
						);
					})}
				></WorldMap>
			</S.WorldMapContainer>

			<S.Cost>{cost}$</S.Cost>

			<Flex dir="row" width="100%" height="100%" $gap={"1rem"}>
				<Flex dir="col" width="auto" $minWidth="67rem" height="auto">
					<Box title="Servers">
						<S.Servers ref={refServers}>
							<S.Canvas>
								<Canvas
									key={JSON.stringify(linksDatabases)}
									draw={(ctx) => {
										ctx.save();

										linksDatabases.forEach((link) => {
											drawLines(ctx, link, "#000000");
											drawCircles(ctx, [link[0]], 3, "#00cc00", "#00cc00");
											drawCircles(ctx, [link[link.length - 1]], 3, "#00cc00", "#00cc00");
										});

										ctx.restore();
									}}
								/>
							</S.Canvas>

							{servers.map((server) => (
								<S.Server key={server.name}>
									<Server
										name={server.name}
										title={server.name}
										text={Locations[server.location].name}
										icon={IconServer}
										onClickDelete={() => {
											handleOnClickDeleteServer(server);
										}}
										primary={ServerDevice(server, "primary")}
										replica={ServerDevice(server, "replica")}
										flash={ServerDevice(server, "flash")}
										disk={ServerDevice(server, "disk")}
									/>
								</S.Server>
							))}
						</S.Servers>
					</Box>
				</Flex>

				<Flex dir="col" width="100%" height="auto" $maxWidth="50rem" $gap="1rem">
					<S.Plans>
						<Box title="Plans">
							{plans.map((plan) => {
								const name = `Cache ${plan.sizeCache}, Flash ${plan.sizeFlash}, Disk ${plan.sizeDisk}`;

								return (
									<S.Plan key={name} $isEnabled={plan.isEnabled}>
										<S.PlanName>{name} - </S.PlanName>
										<S.PlanPrice $isEnabled={plan.isEnabled}>{plan.price}$</S.PlanPrice>
									</S.Plan>
								);
							})}
						</Box>
					</S.Plans>

					<S.Tips>
						<Box title="Tips">
							<ul>
								{tips.map((tip) => (
									<li key={tip.text}>
										<S.Tip>
											{reactStringReplace(tip.text, /<(.+?)>(.*?)<\/.+?>/g, (match) => {
												const index = match[1] as unknown as string;
												const result: { [K: string]: React.ReactNode } = {
													1: <S.Mark1 key={match.index}>{match[2]}</S.Mark1>,
													2: <S.Mark2 key={match.index}>{match[2]}</S.Mark2>,
												};

												return result[index];
											})}
										</S.Tip>
									</li>
								))}
							</ul>
						</Box>
					</S.Tips>
				</Flex>
			</Flex>
		</S.Container>
	);
};
