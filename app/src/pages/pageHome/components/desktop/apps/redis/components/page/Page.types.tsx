import { ReactNode } from "react";
import subs from "./../../data/subscriptions.json";

export type Sub = {
	name: ReactNode;
	id: string;
	type: string;
	dbs: {
		name: string;
		id: string;
	}[];
};

export type Subscription = (typeof subs.subscriptions)[0];
export type SubscriptionType = "fixed" | "pro" | "active-active";
