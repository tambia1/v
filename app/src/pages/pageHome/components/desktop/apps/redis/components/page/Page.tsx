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

		for (let i = 0; i < subs.subscriptions.length; i++) {
			newData.push({
				name: (
					<span
						onClick={() => {
							setCollapsed({ ...collapsed, [subs.subscriptions[i].id]: !collapsed[subs.subscriptions[i].id] });
						}}
					>
						{subs.subscriptions[i].name}
					</span>
				),
				id: String(subs.subscriptions[i].id),
				type: getSubscriptionType(subs.subscriptions[i]),
				dbs: bdbs.bdbs.filter((bdb) => bdb.subscription === subs.subscriptions[i].id).map((bdb) => ({ name: bdb.name, id: String(bdb.id) })),
			});
		}

		setData(newData);
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
			<S.TableSubscriptions>
				<S.TableHead>
					{subsTitles.map((col, i) => (
						<S.TableCol key={i}>{col}</S.TableCol>
					))}
				</S.TableHead>

				<S.TableBody>
					{data.map((sub) => (
						<>
							<S.TableRow>
								<S.TableDataText onClick={() => handleOnClickCollpse(sub.id)}>{sub.name}</S.TableDataText>
								<S.TableDataText>{sub.id}</S.TableDataText>
								<S.TableDataText>{sub.type}</S.TableDataText>
								<S.TableDataText>{sub.dbs.length}</S.TableDataText>
							</S.TableRow>

							<S.TableRow>
								<S.TableData colSpan={100}>
									<Collapsable collapsed={collapsed[sub.id]}>
										<S.TableDatabases>
											<S.TableHead>
												{dbsTitles.map((col, i) => (
													<S.TableCol key={i}>{col}</S.TableCol>
												))}
											</S.TableHead>
											<S.TableBody>
												<S.TableRow>
													{sub.dbs.map((db) => (
														<S.TableRow>
															<S.TableDataText onClick={handleOnClickAbout}>{db.name}</S.TableDataText>
															<S.TableDataText>{db.id}</S.TableDataText>
														</S.TableRow>
													))}
												</S.TableRow>
											</S.TableBody>
										</S.TableDatabases>
									</Collapsable>
								</S.TableData>
							</S.TableRow>
						</>
					))}
				</S.TableBody>
			</S.TableSubscriptions>
		</S.Page>
	);
};
