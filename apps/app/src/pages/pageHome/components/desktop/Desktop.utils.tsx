import { useMemo } from "react";
import { IApp } from "./Desktop.apps";
import { IRole } from "./Desktop.types";

export const getAppsGroups = (apps: IApp[][], role: IRole) => {
	const appsGroups = useMemo(() => {
		const groups: typeof apps = [];

		for (let i = 0; i < apps.length; i++) {
			for (let j = 0; j < apps[i].length; j++) {
				if (apps[i][j].roles.includes(role)) {
					groups[i] = groups[i] || [];
					groups[i].push(apps[i][j]);
				}
			}
		}

		return groups;
	}, [apps, role]);

	return appsGroups;
};
