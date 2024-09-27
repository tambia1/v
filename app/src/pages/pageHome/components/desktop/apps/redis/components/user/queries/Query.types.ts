import { bdbs } from "../../../data/bdbs";
import { crdbs } from "../../../data/crdbs";
import { plans } from "../../../data/plans";
import { subs } from "../../../data/subs";

export type QueryResult<ResponseType> = {
	error: number;
	message: string;
	response?: ResponseType;
};

export type Plan = (typeof plans.plans)[number];
export type PlanType = (typeof plans.plans)[number]["plan_type"];
export type PlanCloud = (typeof plans.plans)[number]["cloud"];

export type Subscription = (typeof subs.subscriptions)[number];

export type Bdb = (typeof bdbs.bdbs)[number];

export type Crdb = (typeof crdbs.crdbs)[number];
