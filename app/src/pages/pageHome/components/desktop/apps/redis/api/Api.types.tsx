import type { bdbs } from "../data/bdbs";
import type { crdbs } from "../data/crdbs";
import type { login } from "../data/login";
import type { me } from "../data/me";
import type { plans } from "../data/plans";
import type { regions } from "../data/regions";
import type { subs } from "../data/subs";

export type QueryResult<ResponseType> = {
	error: number;
	message: string;
	response?: ResponseType;
};

export type Login = typeof login;

export type Me = typeof me;

export type Plan = (typeof plans.plans)[number];
export type PlanType = (typeof plans.plans)[number]["plan_type"];
export type PlanCloud = (typeof plans.plans)[number]["cloud"];

export type Subscription = (typeof subs.subscriptions)[number];

export type Bdb = (typeof bdbs.bdbs)[number];
export type BdbDataPersistence = (typeof bdbs.bdbs)[number]["data_persistence"];

export type Crdb = (typeof crdbs.crdbs)[number];

export type Region = (typeof regions)[number];

export const cloudMap = {
	aws: "AWS",
	gcp: "GCP",
	azure: "Azure",
};

export const dataPersistenceMap = {
	disabled: "Disabled",
	aof: "Append only file every 1 sec",
	"aof:every_write": "Append only file every write",
	"snapshot:3600": "Snapshot every 1 hour",
	"snapshot:21600": "Snapshot every 6 hour",
	"snapshot:43200": "Snapshot every 12 hour",
};

export const modulesMap = {
	bf: "Probabilistic",
	rejson: "JSON",
	timeseries: "Time series",
	searchlight: "Search and query",
};
