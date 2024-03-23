import { useMemo } from "react";
import { IApp } from "./Desktop.apps";
import { IApp as IStoreApp } from "./stores/StoreApps";
import { IRole } from "./Desktop.types";
import { Frame } from "./apps/frame/Frame";

export const removeAppsNotFittingByRoles = (apps: IApp[][], role: IRole) => {
	const appsGroups = useMemo(() => {
		const groups: typeof apps = [];

		for (let i = 0; i < apps.length; i++) {
			const group = [];
			for (let j = 0; j < apps[i].length; j++) {
				if (apps[i][j].roles.includes(role)) {
					group.push(apps[i][j]);
				}
			}

			if (group.length > 0) {
				groups.push(group);
			}
		}

		return groups;
	}, [apps, role]);

	return appsGroups;
};

export const getExternalApps = (storeApps: IStoreApp[]) => {
	const externalApps = useMemo(() => {
		const apps = storeApps.map(
			(app) =>
				({
					id: app.name,
					roles: ["admin", "user", "guest"],
					title: app.name,
					icon: app.icon,
					component: <Frame title={app.name} url={app.url} />,
				} as IApp)
		);

		return apps;
	}, [storeApps]);

	return externalApps;
};
