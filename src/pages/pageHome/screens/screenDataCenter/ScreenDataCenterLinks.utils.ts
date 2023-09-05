import { IRect, IXY } from "@src/components/canvas/Canvas.types";
import { IServer, ISlot } from "@src/data/data";
import { ILocation } from "@src/data/locations";
import { getElementPosition } from "@src/utils/Dom";

export const getDatabasesLinks = (servers: IServer[], parentElement: HTMLDivElement | null) => {
	const links: IXY[][] = [];

	if (!parentElement) {
		return links;
	}

	const list: string[][] = [];

	for (const server of servers) {
		for (const slot of Object.keys(server.slots) as ISlot[]) {
			for (const database of server.slots[slot]) {
				list.push([database.name, database.link]);
			}
		}
	}

	list.forEach((item) => {
		const elmSrc = document.querySelector(`div[data-name="${item[0]}"]`) as HTMLElement;
		const elmTrg = document.querySelector(`div[data-name="${item[1]}"]`) as HTMLElement;

		if (elmSrc && elmTrg) {
			const elmSrcPos = getElementPosition(elmSrc, parentElement);
			const elmTrgPos = getElementPosition(elmTrg, parentElement);

			if (elmSrcPos.x < elmTrgPos.x) {
				[elmSrcPos.x, elmTrgPos.x, elmSrcPos.y, elmTrgPos.y] = [elmTrgPos.x, elmSrcPos.x, elmTrgPos.y, elmSrcPos.y];
			}

			const pts = getConnectionPints(elmSrcPos, elmTrgPos);

			links.push(pts);
		}
	});

	return links;
};

const getConnectionPints = (s: IRect, t: IRect) => {
	const pts: IXY[] = [];
	const X = 13;
	const Y = 34;

	if (s.x2 < t.x1) {
		pts.push({ x: s.x2, y: s.y1 + s.h / 2 });
		pts.push({ x: s.x2 + X, y: s.y1 + s.h / 2 });

		if (s.x1 !== t.x1 && t.x1 - s.x2 > 50) {
			pts.push({ x: s.x2 + X, y: s.y1 + s.h / 2 - Y });
			pts.push({ x: t.x1 - X, y: s.y1 + s.h / 2 - Y });
		}

		pts.push({ x: t.x1 - X, y: t.y2 - t.h / 2 });
		pts.push({ x: t.x1, y: t.y2 - t.h / 2 });
	} else {
		pts.push({ x: s.x1, y: s.y1 + s.h / 2 });
		pts.push({ x: s.x1 - X, y: s.y1 + s.h / 2 });

		if (s.x1 !== t.x1 && s.x1 - t.x2 > 50) {
			pts.push({ x: s.x1 - X, y: s.y1 + s.h / 2 - Y });
			pts.push({ x: t.x2 + X, y: s.y1 + s.h / 2 - Y });
		}

		if (s.x1 === t.x1) {
			pts.push({ x: t.x1 - X, y: t.y2 - t.h / 2 });
			pts.push({ x: t.x1, y: t.y2 - t.h / 2 });
		} else {
			pts.push({ x: t.x2 + X, y: t.y2 - t.h / 2 });
			pts.push({ x: t.x2, y: t.y2 - t.h / 2 });
		}
	}

	return pts;
};

export const getServersLinks = (servers: IServer[], parentElement: HTMLDivElement | null) => {
	const links: { from: ILocation; to: ILocation }[] = [];

	if (!parentElement) {
		return links;
	}

	for (const serverA of servers) {
		for (const slotA of Object.keys(serverA.slots) as ISlot[]) {
			for (const databaseA of serverA.slots[slotA]) {
				if (databaseA.link != "") {
					for (const serverB of servers) {
						if (serverB === serverA) {
							continue;
						}

						for (const slotB of Object.keys(serverB.slots) as ISlot[]) {
							for (const databaseB of serverB.slots[slotB]) {
								const isFound = links.find((link) => (link.from === serverA.location && link.to === serverB.location) || (link.to === serverA.location && link.from === serverB.location));

								if (isFound) {
									continue;
								}

								if (databaseA.link === databaseB.name) {
									links.push({ from: serverA.location, to: serverB.location });
								}
							}
						}
					}
				}
			}
		}
	}

	return links;
};
