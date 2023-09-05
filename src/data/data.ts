import { ILocation } from "./locations";

export const servers: IServer[] = [];

export interface IServer {
	name: string;
	location: ILocation;
	slots: { [K in ISlot]: IDatabase[] };
}

export type ISlot = "primary" | "replica" | "flash" | "disk";

export interface IDatabase {
	name: string;
	size: number;
	link: IDatabase["name"];
}
