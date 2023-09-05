import { IDatabase, IServer, ISlot } from "@src/data/data";
import { ILocation } from "@src/data/locations";

export const getServer = (servers: IServer[], name: IServer["name"]) => {
	return servers.find((server) => server.name === name) || null;
};

export const addServer = (servers: IServer[], name: string, location: ILocation) => {
	const server = {
		name: name,
		location: location,
		slots: {
			primary: [],
			replica: [],
			flash: [],
			disk: [],
		},
	};

	servers.push(server);

	return servers;
};

export const deleteServer = (servers: IServer[], serverToDelete: IServer) => {
	Object.keys(serverToDelete.slots).forEach((slot) => {
		serverToDelete.slots[slot as ISlot].forEach((database) => {
			deleteDatabase(servers, database);
		});
	});

	const serverToDeleteIndex = servers.findIndex((server) => server.name === serverToDelete.name);
	servers.splice(serverToDeleteIndex, 1);
};

export const getDatabase = (servers: IServer[], name: IDatabase["name"]) => {
	for (const server of servers) {
		for (const slot of Object.keys(server.slots)) {
			for (const database of server.slots[slot as ISlot]) {
				if (database.name === name) {
					return database;
				}
			}
		}
	}

	return null;
};

export const addDatabase = (server: IServer, slot: ISlot, name: string, size: number) => {
	const database: IDatabase = {
		name: name,
		size: size,
		link: "",
	};

	server.slots[slot].push(database);

	return database;
};

export const deleteDatabase = (servers: IServer[], databaseToDelete: IDatabase) => {
	servers.forEach((server) => {
		Object.keys(server.slots).forEach((slot) => {
			server.slots[slot as ISlot] = server.slots[slot as ISlot].filter((database) => database.name !== databaseToDelete.name);
		});
	});

	servers.forEach((server) => {
		Object.keys(server.slots).forEach((slot) => {
			server.slots[slot as ISlot].forEach((database) => {
				if (database.link === databaseToDelete.name) {
					database.link = "";
				}
			});
		});
	});
};
