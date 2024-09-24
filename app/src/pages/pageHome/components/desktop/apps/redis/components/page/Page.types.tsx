import { ReactNode } from "react";
import subs from "./../../data/subscriptions.json";
import bdbs from "./../../data/bdbs.json";

export type Sub = {
	name: ReactNode;
	id: string;
	type: SubscriptionType;
	dbs: {
		name: string;
		id: string;
		usage: number;
	}[];
};

export type Subscription = (typeof subs.subscriptions)[0];
export type SubscriptionType = "fixed" | "pro" | "active-active";

export type Bdb = (typeof bdbs.bdbs)[0];
