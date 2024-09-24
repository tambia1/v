import * as S from "./Page.styles";
import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import { Navigator } from "@src/components/navigator/Navigator";
import { About } from "./components/about/About";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { MouseEvent, useEffect, useState } from "react";
import subs from "../../data/subscriptions.json";
import bdbs from "../../data/bdbs.json";
import { Collapsable } from "@src/components/collapsable/Collapsable";
import { Icon } from "@src/icons/Icon";
import { Sub } from "./Page.types";
import { convertBytes, getSubscriptionType } from "./Page.utils";

const subsTitles = ["", "SUBSCRIPTION", "ID", "TYPE", "QTY", ""];
const dbsTitles = ["DATABASE", "ID", "USAGE", ""];

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
				dbs: bdbs.bdbs.filter((bdb) => bdb.subscription === subs.subscriptions[i].id).map((bdb) => ({ name: bdb.name, id: String(bdb.id), usage: bdb.usage })),
			});
			newCollapsed[subs.subscriptions[i].id] = true;
		}

		setData(newData);
		setCollapsed(newCollapsed);
	}, []);

	const handleOnClickAbout = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();

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
			<S.List>
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
								{sub.type === "fixed" && <Icon iconName="iconServerSingle" />}
								{sub.type === "pro" && <Icon iconName="iconServer" />}
								{sub.type === "active-active" && <Icon iconName="iconGrid" />}
							</S.SubscriptionsText>
							<S.SubscriptionsText>{sub.dbs.length}</S.SubscriptionsText>
							<S.IconRight onClick={(e) => handleOnClickAbout(e)}>
								<Icon iconName="iconChevronRight" />
							</S.IconRight>
						</S.SubscriptionsRow>

						<S.Databases>
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

											<S.DatabasesRow onClick={(e) => handleOnClickAbout(e)}>
												<S.DatabasesText>{db.name}</S.DatabasesText>
												<S.DatabasesText>{db.id}</S.DatabasesText>
												<S.DatabasesText>{`${convertBytes(db.usage, "mb")}MB`}</S.DatabasesText>
												<S.IconRight>
													<Icon iconName="iconChevronRight" />
												</S.IconRight>
											</S.DatabasesRow>
										</S.Col>
									))}
								</S.Col>
							</Collapsable>
						</S.Databases>

						<S.Row>
							<S.SubscriptionsLine />
						</S.Row>
					</S.Col>
				))}
			</S.List>
		</S.Page>
	);
};
