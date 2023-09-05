import { IDatabase, IServer, ISlot } from "@src/data/data";
import { Tip } from "./ScreenDataCenter.types";

let id = 0;

export const getTips = (servers: IServer[]) => {
	const tips: Tip[] = [];

	checkTipForNoServers(tips, servers);
	checkTipForEmptyServer(tips, servers);
	checkTipForNoPrimaryAtAll(tips, servers);
	checkTipForPrimaryWithNoReplica(tips, servers);
	checkTipForPrimaryWithEvenNumberOfReplica(tips, servers);
	checkTipForPrimaryWithNoFlash(tips, servers);
	checkTipForPrimaryWithNoDisk(tips, servers);
	checkTipForPrimaryAndReplicaAtTheSameServer(tips, servers);
	checkTipForPrimaryAndDiskAtTheSameServer(tips, servers);
	checkTipForPrimaryAndFlashNotAtTheSameServer(tips, servers);
	checkTipForPrimaryWithNoClone(tips, servers);

	checkTipForEmptyTips(tips);

	return tips;
};

const getLinks = (servers: IServer[], name: IDatabase["name"], slot: ISlot) => {
	const items: { server: IServer; database: IDatabase }[] = [];

	for (const server of servers) {
		for (const database of server.slots[slot]) {
			if (database.link === name) {
				items.push({ server, database });
			}
		}
	}

	return items;
};

const checkTipForEmptyTips = (tips: Tip[]) => {
	if (tips.length === 0) {
		tips.push({ id: id++, text: "No more <2>tips</2>!" });
	}
};

const checkTipForNoServers = (tips: Tip[], servers: IServer[]) => {
	if (servers.length === 0) {
		tips.push({ id: id++, text: "You have no <1>servers</1>, add more by selecting a location on the <2>map</2>." });
	}
};

const checkTipForEmptyServer = (tips: Tip[], servers: IServer[]) => {
	for (const server of servers) {
		if (server.slots.primary.length === 0 && server.slots.replica.length === 0 && server.slots.flash.length === 0 && server.slots.disk.length === 0) {
			tips.push({ id: id++, text: `Server <1>"${server.name}"</1> is empty, add <2>primary databases</2>.` });
		}
	}
};

const checkTipForNoPrimaryAtAll = (tips: Tip[], servers: IServer[]) => {
	let amountOfPrimaryDatabases = 0;

	for (const server of servers) {
		amountOfPrimaryDatabases += server.slots.primary.length;
	}

	if (Object.keys(servers).length > 0 && amountOfPrimaryDatabases === 0) {
		tips.push({ id: id++, text: `No <2>primary database</2> has found in any server.` });
	}
};

const checkTipForPrimaryWithNoReplica = (tips: Tip[], servers: IServer[]) => {
	for (const server of servers) {
		for (const database of server.slots.primary) {
			const replicas = getLinks(servers, database.name, "replica");

			if (replicas.length === 0) {
				tips.push({ id: id++, text: `Primary database <1>"${database.name}"</1> has <2>no replica</2>, add a replica database for <2>high availability</2>.` });
			}
		}
	}
};

const checkTipForPrimaryWithEvenNumberOfReplica = (tips: Tip[], servers: IServer[]) => {
	for (const server of servers) {
		for (const database of server.slots.primary) {
			const replicas = getLinks(servers, database.name, "replica");

			if (replicas.length > 0 && replicas.length % 2 === 0) {
				tips.push({
					id: id++,
					text: `Primary database <1>"${database.name}"</1> has an even number of replicas, you need to have an <2>odd number of replicas</2> to get election mejoraty in case of failover.`,
				});
			}
		}
	}
};

const checkTipForPrimaryWithNoFlash = (tips: Tip[], servers: IServer[]) => {
	for (const server of servers) {
		for (const database of server.slots.primary) {
			const flashes = getLinks(servers, database.name, "flash");

			if (flashes.length === 0) {
				tips.push({ id: id++, text: `Primary database <1>"${database.name}"</1> has <2>no flash</2>, add a one for saving cache memory and <2>reduce cost</2>.` });
			}
		}
	}
};

const checkTipForPrimaryWithNoDisk = (tips: Tip[], servers: IServer[]) => {
	for (const server of servers) {
		for (const database of server.slots.primary) {
			const disks = getLinks(servers, database.name, "disk");

			if (disks.length === 0) {
				tips.push({ id: id++, text: `Primary database <1>"${database.name}"</1> has <2>no persistant storage</2>, add one for <2>fail recovary</2>.` });
			}
		}
	}
};

const checkTipForPrimaryAndReplicaAtTheSameServer = (tips: Tip[], servers: IServer[]) => {
	for (const serverA of servers) {
		for (const databaseA of serverA.slots.primary) {
			const replicasInSameServer = [];

			for (const databaseB of serverA.slots.replica) {
				if (databaseB.link === databaseA.name) {
					replicasInSameServer.push(databaseB);
				}
			}

			if (replicasInSameServer.length > 0) {
				tips.push({ id: id++, text: `Primary database <1>"${databaseA.name}"</1> has replicas in the same server, move it to a different server for better <2>fail recovery</2>.` });
			}
		}
	}
};

const checkTipForPrimaryAndDiskAtTheSameServer = (tips: Tip[], servers: IServer[]) => {
	for (const serverA of servers) {
		for (const databaseA of serverA.slots.primary) {
			const disksInSameServer = [];

			for (const databaseB of serverA.slots.disk) {
				if (databaseB.link === databaseA.name) {
					disksInSameServer.push(databaseB);
				}
			}

			if (disksInSameServer.length > 0) {
				tips.push({ id: id++, text: `Primary database <1>"${databaseA.name}"</1> has disk in the same server, move it to a different server for better <2>fail recovery</2>.` });
			}
		}
	}
};

const checkTipForPrimaryAndFlashNotAtTheSameServer = (tips: Tip[], servers: IServer[]) => {
	for (const serverA of servers) {
		for (const databaseA of serverA.slots.primary) {
			const links = getLinks(servers, databaseA.name, "flash");
			const flashesNotInSameServer = links.filter((link) => link.server.name != serverA.name);

			if (flashesNotInSameServer.length > 0) {
				tips.push({ id: id++, text: `Primary database <1>"${databaseA.name}"</1> has flash not in the same server, move it to this server for <2>better performance</2>.` });
			}
		}
	}
};

const checkTipForPrimaryWithNoClone = (tips: Tip[], servers: IServer[]) => {
	for (const server of servers) {
		for (const database of server.slots.primary) {
			const primaries = getLinks(servers, database.name, "primary");

			if (primaries.length === 0) {
				tips.push({ id: id++, text: `Primary database <1>"${database.name}"</1> has no clone, add a clone primary database placing physically closer to the user for <2>low-latency</2>.` });
			}
		}
	}
};
