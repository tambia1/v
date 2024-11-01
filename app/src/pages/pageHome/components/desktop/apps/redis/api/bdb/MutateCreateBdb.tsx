import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import type { QueryResult } from "../Api.types";

type Props = {
	csrf: string;
	plan: number;
	recurringPaymentInfo: number;
	bdbName: string;
	replication: boolean;
	dataPersistence: string;
};

type CreateBdbResponse = typeof fakeResponse;
type Result = QueryResult<CreateBdbResponse>;

const send = async (props: Props): Promise<Result> => {
	let result: Result = {
		error: 1,
		message: "error",
	};

	try {
		const response = await fetch("https://app-sm.k8s-gh.sm-qa.qa.redislabs.com/api/v1/bdb_packages", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-csrf-token": props.csrf,
			},
			credentials: "include",
			body: JSON.stringify({
				bdb_package: {
					subscription: {
						plan: props.plan,
						recurring_payment_info: props.recurringPaymentInfo,
						is_marketplace: false,
					},
					bdb: {
						name: props.bdbName,
						replication: props.replication,
						data_persistence: props.dataPersistence,
						eviction_policy: "volatile-lru",
						bdb_type: "redis",
					},
				},
			}),
		});

		const res = await response.json();

		if (response.ok) {
			result = {
				error: 0,
				message: "",
				response: res,
			};
		} else {
			result = {
				error: 2,
				message: "error",
			};
		}
	} catch (error) {
		result = {
			error: 1,
			message: "error",
		};
	}

	if (result.error !== 0) {
		result = {
			error: 0,
			message: "fake",
			response: fakeResponse,
		};
	}

	return result;
};

export const mutateCreateBdb = (options?: UseMutationOptions<Result, Error, Props, unknown>) => {
	const { mutateAsync } = useMutation({
		mutationFn: (props: Props) => send(props),
		...options,
	});

	return mutateAsync;
};

const fakeResponse = {
	bdb_package: {
		bdb: {
			id: 51043988,
			name: "cache-M2YTGOOA",
			db_version: null,
			bdb_type: "redis",
			data_persistence: "disabled",
			replication: false,
			size: 0,
			min_size: 0,
			usage: 6606027,
			access_control: {
				id: 51043988,
				has_source_ips: false,
				source_ips: [
					{
						id: 8340092,
						addr: "0.0.0.0/0",
					},
				],
				has_security_groups: false,
				security_groups: [],
				has_redis_password: true,
				redis_password: "MAIh2VRGY52MVKAaRxTJrBi997Z120gV",
				default_user: true,
				has_sasl_auth: false,
				sasl_user_name: null,
				sasl_user_password: null,
				has_ssl_auth: null,
				enforce_client_authentication: null,
				certificates: [],
			},
			eviction_policy: "volatile-lru",
			sync: false,
			sync_state: "no-sync",
			replica_of: [],
			has_sharding: false,
			sharding_type: "default-regex-rules",
			shards_count: null,
			regex_rules: [],
			backup: false,
			is_redislabs_backup_path: false,
			backup_interval: null,
			backup_interval_offset: null,
			bdb_alerts: [],
			status: "pending",
			dns_master_public: null,
			dns_master_private: null,
			activate_date: null,
			creation_date: "2024-11-01T14:15:43Z",
			last_change_date: null,
			backup_status: null,
			backup_progress: null,
			backup_failure_reason: null,
			import_status: null,
			last_import_time: null,
			import_progress: null,
			import_failure_reason: null,
			import_failure_reason_params: [],
			import_source_type: null,
			import_aws_access: null,
			import_aws_secret: null,
			import_email_notification: false,
			sync_info: null,
			is_rof: false,
			max_throughput: null,
			ram_size: null,
			used_ram: null,
			used_rof: null,
			free_memory: null,
			free_rof: null,
			last_request_time: null,
			cluster: {
				id: 44483,
				supports_noeviction: true,
				supports_lfu: true,
				supports_ssl: false,
				supports_clustering: true,
				supports_security_groups: true,
				supports_slowlog: true,
				supports_oss_cluster: true,
				supports_resp3: true,
				supports_oss_cluster_api_preferred_ip_type: true,
				support_rcp_regex_rules_change: true,
				supports_client_authentication_enforcement: true,
				supports_multi_modules: true,
				supports_redis_stack: true,
				is_V4: true,
				max_memcached_size: 50,
				max_redis_size: 200,
				max_global_memcached_size: 1000000,
				max_global_redis_size: 1000000,
				is_rof: false,
				max_throughput: null,
				absolute_bdb_max_size: 500,
				total_memory: 94610,
				is_acl_supported: true,
				supports_redis_modules: true,
				maintenance_mode: false,
				supported_redis_features: [
					{
						name: "resp3",
						min_redis_version: "7.2",
						min_software_version: "7.2",
					},
					{
						name: "search_vertical_scaling_create",
						min_redis_version: "7.2",
						min_software_version: "7.4",
					},
					{
						name: "search_vertical_scaling_update",
						min_redis_version: "7.4",
						min_software_version: "7.6",
					},
					{
						name: "rdi",
						min_redis_version: "6.2",
						min_software_version: "6.4.2-61",
					},
				],
				default_redis_version: "7.4",
				errors: [],
			},
			subscription: 127399,
			average_value_size: null,
			sharding_policy: "shards_count",
			bdb_modules: [
				{
					id: 79975,
					module: {
						id: 209,
						name: "bf",
						display_name: "RedisBloom",
						capability_name: "Probabilistic",
						version: "2.8.2",
						uid: "7416770ba7662648a174e0d1e4dcf1e9",
						icon: "bf",
						description: "Probabilistic Data Structures for Redis",
						default_args: "",
						documents_arg_required: false,
						is_custom: false,
						module_capabilities: [
							"replica_of",
							"eviction",
							"backup_restore",
							"reshard",
							"persistence_aof",
							"persistence_snapshot",
							"hash_policy",
							"clustering",
							"flash",
						],
						multi_modules_specs: null,
						errors: null,
					},
					module_args_list: "",
					number_of_documents: 0,
					number_of_threads: null,
					errors: null,
				},
				{
					id: 79974,
					module: {
						id: 210,
						name: "ReJSON",
						display_name: "RedisJSON",
						capability_name: "JSON",
						version: "2.8.3",
						uid: "b2c81a53d949386f7255e518013f0576",
						icon: "rejson",
						description: "Native JSON Data Type for Redis",
						default_args: "",
						documents_arg_required: false,
						is_custom: false,
						module_capabilities: [
							"replica_of",
							"eviction",
							"flash",
							"backup_restore",
							"reshard",
							"persistence_aof",
							"persistence_snapshot",
							"hash_policy",
							"clustering",
						],
						multi_modules_specs: null,
						errors: null,
					},
					module_args_list: "",
					number_of_documents: 0,
					number_of_threads: null,
					errors: null,
				},
				{
					id: 79973,
					module: {
						id: 211,
						name: "timeseries",
						display_name: "RedisTimeSeries",
						capability_name: "Time series",
						version: "1.12.2",
						uid: "4a5e985c29f844c3e9569c0a3ca871a2",
						icon: "timeseries",
						description: "A time series database for Redis",
						default_args: "",
						documents_arg_required: false,
						is_custom: false,
						module_capabilities: [
							"replica_of",
							"backup_restore",
							"hash_policy",
							"eviction",
							"persistence_aof",
							"persistence_snapshot",
							"hash_policy",
							"clustering",
							"reshard",
							"flash",
						],
						multi_modules_specs: null,
						errors: null,
					},
					module_args_list: "",
					number_of_documents: 0,
					number_of_threads: null,
					errors: null,
				},
				{
					id: 79972,
					module: {
						id: 215,
						name: "searchlight",
						display_name: "RediSearch Light 2",
						capability_name: "Search and query",
						version: "2.10.6",
						uid: "123787878cf0ab58cdae18bb77ac8dd3",
						icon: "searchlight",
						description: "High performance search index on top of Redis (without clustering)",
						default_args: "FORK_GC_CLEAN_THRESHOLD 100 MAXAGGREGATERESULTS 10000 MAXSEARCHRESULTS 10000 MT_MODE MT_MODE_ONLY_ON_OPERATIONS WORKER_THREADS 4",
						documents_arg_required: false,
						is_custom: false,
						module_capabilities: [
							"replica_of",
							"persistence_aof",
							"persistence_snapshot",
							"clustering",
							"backup_restore",
							"reshard",
							"flash",
							"eviction",
							"hash_policy",
						],
						multi_modules_specs: null,
						errors: null,
					},
					module_args_list:
						"FORK_GC_CLEAN_THRESHOLD 100 MAXAGGREGATERESULTS 10000 MAXSEARCHRESULTS 10000 MT_MODE MT_MODE_ONLY_ON_OPERATIONS WORKER_THREADS 4 FORK_GC_CLEAN_THRESHOLD 100",
					number_of_documents: 0,
					number_of_threads: null,
					errors: null,
				},
			],
			oss_cluster: false,
			oss_cluster_api_preferred_ip_type: "internal",
			preferred_proxy_policy: null,
			shard_type_pricing_bdb_regions: null,
			is_redis_stack: true,
			resp3: true,
			network_monthly_usage: null,
			is_auto_created: false,
			port: null,
			cluster_failure_reason: null,
			search_scaling_factor: null,
			is_redis_flex: false,
			errors: [],
			"secret-data-masc": null,
		},
		subscription: {
			aa_rcp: null,
			account: 128493,
			backup_interval_configurable: false,
			billing_item: 1424079,
			cancel_reason: null,
			empty_bdb_password_allowed: false,
			creation_date: "2024-11-01T14:15:28Z",
			expiration_date: null,
			expiration_days_left: null,
			id: 127399,
			initial_charge: 0.0,
			initial_payment_info: null,
			pricing_version: null,
			minimal_pricing_regions: [],
			name: "cache-M2YTGOOA",
			next_payment_date: null,
			period: 0,
			plan: 32190,
			rcp: null,
			recurring_charge: null,
			recurring_payment_info: 63492,
			shard_type_pricing_regions: [],
			status: "active",
			zone_id: null,
			bdbs_count: 0,
			bdbs_memory_usage: 0,
			bdbs_memory_total_size: 0,
			crdbs_count: 0,
			bdb_statuses: {},
			is_marketplace: false,
			pay_now_url: null,
			pay_now_reason: null,
			is_blocked_for_changes: false,
			is_support_psc: null,
			is_support_proxy_policy_override: null,
			is_bdb_package: true,
			payment_next_action: null,
			errors: [],
		},
		errors: [],
	},
};
