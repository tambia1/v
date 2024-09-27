import * as S from "./Datacenter.styles";
import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import { Navigator } from "@src/components/navigator/Navigator";
import { Database } from "./components/database/Database";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { MouseEvent, useEffect, useState } from "react";
import { plans } from "../../data/plans";
import { subs } from "../../data/subs";
import { bdbs } from "../../data/bdbs";
import { Collapsable } from "@src/components/collapsable/Collapsable";
import { Icon } from "@src/icons/Icon";
import { Sub } from "./Datacenter.types";
import { Subscription } from "./components/subscription/Subscription";
import { QueryPlans } from "../user/queries/QueryPlans";
import { StoreUser } from "../user/stores/StoreUser";
import { QueryMe } from "../user/queries/QueryMe";

const subsTitles = ["", "SUBSCRIPTION", "ID", "TYPE", "QTY", ""];
const dbsTitles = ["DATABASE", "ID", "USAGE", ""];

export const Datacenter = () => {
	const navigator = useNavigator();
	const [data, setData] = useState<Sub[]>([]);
	const [collapsed, setCollapsed] = useState<{ [K: string]: boolean }>({});

	const storeUser = StoreUser();

	const queryMe = QueryMe.me({ csrf: storeUser.csrf });
	const queryPlans = QueryPlans.plans({ csrf: storeUser.csrf, only_customer_plans: false });

	console.log("aaa", queryMe.data);
	console.log("ccc", queryPlans.data);

	useEffect(() => {
		const newData: Sub[] = [];
		const newCollapsed: { [K: string]: boolean } = {};

		for (let i = 0; i < subs.length; i++) {
			const plan = plans.filter((plan) => plan.id === subs[i].plan)[0];

			newData.push({
				name: subs[i].name,
				id: subs[i].id,
				type: plan.plan_type,
				cloud: plan.cloud,
				dbs: bdbs
					.filter((bdb) => bdb.subscription === subs[i].id)
					.map((bdb) => ({
						name: bdb.name,
						id: bdb.id,
						usage: bdb.usage,
						size: bdb.size || plan.size,
					})),
			});
			newCollapsed[subs[i].id] = true;
		}

		setData(newData);
		setCollapsed(newCollapsed);
	}, []);

	const handleOnClickSubscription = (e: MouseEvent<HTMLDivElement>, subscriptionId: number) => {
		e.stopPropagation();

		navigator.pushPage(
			<Navigator.Page id="subscriptioni" title={<T>{lang.redis.subscription.title}</T>}>
				<Subscription subscriptionId={subscriptionId} />
			</Navigator.Page>
		);
	};

	const handleOnClickDatabase = (e: MouseEvent<HTMLDivElement>, databaseId: number) => {
		e.stopPropagation();

		navigator.pushPage(
			<Navigator.Page id="database" title={<T>{lang.redis.database.title}</T>}>
				<Database databaseId={databaseId} />
			</Navigator.Page>
		);
	};

	const handleOnClickCollpse = (subscriptionId: number) => {
		setCollapsed({ ...collapsed, [subscriptionId]: !collapsed[subscriptionId] });
	};

	return (
		<S.Page>
			<S.SubscriptionsList>
				<S.SubscriptionsHeader>
					{subsTitles.map((col, index) => (
						<S.SubscriptionsText key={index}>{col}</S.SubscriptionsText>
					))}
				</S.SubscriptionsHeader>

				{data.map((sub) => (
					<S.Col key={sub.id}>
						<S.SubscriptionsRow onClick={() => handleOnClickCollpse(sub.id)}>
							<S.IconCollapse $collapsed={collapsed[sub.id]}>
								<Icon iconName="iconChevronDown" />
							</S.IconCollapse>
							<S.SubscriptionsText>{sub.name}</S.SubscriptionsText>
							<S.SubscriptionsText>{sub.id}</S.SubscriptionsText>
							<S.SubscriptionsText>
								{sub.type === "free" && <Icon iconName="iconStar" />}
								{sub.type === "paid" && <Icon iconName="iconServerSingle" />}
								{sub.type === "rcp" && <Icon iconName="iconServer" />}
								{sub.type === "aarcp" && <Icon iconName="iconGrid" />}
							</S.SubscriptionsText>
							<S.SubscriptionsText>{sub.dbs.length}</S.SubscriptionsText>
							<S.IconRight onClick={(e) => handleOnClickSubscription(e, sub.id)}>
								<Icon iconName="iconChevronRight" />
							</S.IconRight>
						</S.SubscriptionsRow>

						<S.DatabasesList>
							<Collapsable collapsed={collapsed[sub.id]}>
								<S.DatabasesHeader>
									{dbsTitles.map((col) => (
										<S.SubscriptionsText key={col}>{col}</S.SubscriptionsText>
									))}
								</S.DatabasesHeader>

								<S.Col>
									{sub.dbs.map((db) => (
										<S.Col key={db.id}>
											<S.Row>
												<S.DatabasesLine />
											</S.Row>

											<S.DatabasesRow onClick={(e) => handleOnClickDatabase(e, db.id)}>
												<S.DatabasesText>{db.name}</S.DatabasesText>
												<S.DatabasesText>{db.id}</S.DatabasesText>
												<S.DatabasesText>
													<S.Progress percent={(db.usage / db.size) * 100} />
												</S.DatabasesText>
												<S.IconRight>
													<Icon iconName="iconChevronsRight" />
												</S.IconRight>
											</S.DatabasesRow>
										</S.Col>
									))}
								</S.Col>
							</Collapsable>
						</S.DatabasesList>

						<S.Row>
							<S.SubscriptionsLine />
						</S.Row>
					</S.Col>
				))}
			</S.SubscriptionsList>
		</S.Page>
	);
};
