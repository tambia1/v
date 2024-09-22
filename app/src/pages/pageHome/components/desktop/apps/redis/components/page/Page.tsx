import * as S from "./Page.styles";
import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import { Navigator } from "@src/components/navigator/Navigator";
import { About } from "./components/about/About";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { ReactNode, useEffect, useState } from "react";
import subs from "../../data/subscriptions.json";
import bdbs from "../../data/bdbs.json";
import { Collapsable } from "@src/components/collapsable/Collapsable";
import { List } from "@src/components/list/List";
import { Icon } from "@src/icons/Icon";

type Sub = {
	name: ReactNode;
	id: string;
	type: string;
	dbs: {
		name: string;
		id: string;
	}[];
};

const subsTitles = ["SUBSCRIPTION NAME", "ID", "TYPE", "NUMBER OF DATABASES"];
const dbsTitles = ["DATABASE NAME", "ID"];

type Subscription = (typeof subs.subscriptions)[0];
type SubscriptionType = "fixed" | "pro" | "activeActive";

export const Page = () => {
	const navigator = useNavigator();
	const [data, setData] = useState<Sub[]>([]);

	const [collapsed, setCollapsed] = useState<{ [K: string]: boolean }>({});

	useEffect(() => {
		const newData: Sub[] = [];
		const newCollapsed: { [K: string]: boolean } = {};

		for (let i = 0; i < subs.subscriptions.length; i++) {
			newData.push({
				name: subs.subscriptions[i].name,
				id: String(subs.subscriptions[i].id),
				type: getSubscriptionType(subs.subscriptions[i]),
				dbs: bdbs.bdbs.filter((bdb) => bdb.subscription === subs.subscriptions[i].id).map((bdb) => ({ name: bdb.name, id: String(bdb.id) })),
			});
			newCollapsed[subs.subscriptions[i].id] = true;
		}

		setData(newData);
		setCollapsed(newCollapsed);
	}, []);

	const getSubscriptionType = (subscription: Subscription): SubscriptionType => {
		if (subscription.aa_rcp) {
			return "activeActive";
		}

		if (subscription.rcp) {
			return "pro";
		}

		return "fixed";
	};

	const handleOnClickAbout = () => {
		navigator.pushPage(
			<Navigator.Page id="about" title={<T>{lang.settings.about.title}</T>}>
				<About />
			</Navigator.Page>
		);
	};

	const handleOnClickCollpse = (subId: string) => {
		setCollapsed({ ...collapsed, [subId]: !collapsed[subId] });
	};

	return (
		<S.Page>
			<List.Section>
				{subsTitles.map((col) => (
					<List.Cell.Text key={col}>{col}</List.Cell.Text>
				))}
			</List.Section>

			<List>
				{data.map((sub) => (
					<List.Cell key={sub.id}>
						<div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
							<div style={{ width: "100%", display: "flex", flexDirection: "row" }} onClick={() => handleOnClickCollpse(sub.id)}>
								<List.Cell.Arrow>
									<S.Pressable>
										<Icon iconName={collapsed[sub.id] ? "iconChevronDown" : "iconChevronUp"} />
									</S.Pressable>
								</List.Cell.Arrow>
								<List.Cell.Text>{sub.name}</List.Cell.Text>
								<List.Cell.Text>{sub.id}</List.Cell.Text>
								<List.Cell.Text>{sub.type}</List.Cell.Text>
								<List.Cell.Text>{sub.dbs.length}</List.Cell.Text>
								<List.Cell.Arrow>
									<S.Pressable onClick={() => handleOnClickAbout()}>
										<Icon iconName="iconChevronRight" />
									</S.Pressable>
								</List.Cell.Arrow>
							</div>
							<div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
								<Collapsable collapsed={collapsed[sub.id]}>
									<List.Cell>
										{dbsTitles.map((col) => (
											<List.Cell.Text key={col}>{col}</List.Cell.Text>
										))}
									</List.Cell>

									{sub.dbs.map((db) => (
										<List.Cell key={db.id}>
											<List.Cell.Text>{db.name}</List.Cell.Text>
											<List.Cell.Text>{db.id}</List.Cell.Text>
											<List.Cell.Arrow>
												<S.Pressable onClick={() => handleOnClickAbout()}>
													<Icon iconName="iconChevronRight" />
												</S.Pressable>
											</List.Cell.Arrow>
										</List.Cell>
									))}
								</Collapsable>
							</div>
						</div>
					</List.Cell>
				))}
			</List>
		</S.Page>
	);
};
