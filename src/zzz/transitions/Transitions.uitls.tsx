export const getElementPosition = function (element: HTMLElement, parent: HTMLElement) {
	if (!element || !parent) {
		return { x: 0, y: 0, width: 0, height: 0, left: 0, right: 0, top: 0, bottom: 0 };
	}

	const rectElement = element.getBoundingClientRect();
	const rectParent = parent.getBoundingClientRect();
	const x = Math.round(rectElement.x - rectParent.x);
	const y = Math.round(rectElement.y - rectParent.y);
	const width = Math.round(rectElement.width);
	const height = Math.round(rectElement.height);

	return { x, y, width, height, left: x, right: x + width, top: y, bottom: y + height };
};
