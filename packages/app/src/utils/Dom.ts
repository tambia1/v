export const getElementPosition = function (element: HTMLElement, parent: HTMLElement) {
	if (!element || !parent) {
		return { x: 0, y: 0, w: 0, h: 0, x1: 0, x2: 0, y1: 0, y2: 0, xc: 0, yc: 0 };
	}

	const rectElement = element.getBoundingClientRect();
	const rectParent = parent.getBoundingClientRect();
	const x = Math.round(rectElement.x - rectParent.x);
	const y = Math.round(rectElement.y - rectParent.y);
	const w = Math.round(rectElement.width);
	const h = Math.round(rectElement.height);

	return { x, y, w, h, x1: x, x2: x + w, y1: y, y2: y + h, xc: Math.round(x + w / 2), yc: Math.round(y + h / 2) };
};
