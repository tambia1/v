export const getElementPositionRelativeToParent = function (element: HTMLElement, parent: HTMLElement) {
	let top = 0;
	let left = 0;
	let elm: HTMLElement | null = element;

	if (element.offsetParent) {
		top = elm.offsetTop;
		left = elm.offsetLeft;

		while ((elm = elm.offsetParent as HTMLElement) != undefined && elm != parent) {
			top += elm.offsetTop;
			left += elm.offsetLeft;
		}
	}

	return { x: left, y: top };
};

export const moveElement = (props: {
	source: {
		element: HTMLElement;
		x: number;
		y: number;
	};
	target: {
		element: HTMLElement;
		x: number;
		y: number;
	};
	millis: number;
}) => {
	const sourceComputerStyle = window.getComputedStyle(props.source.element);
	const targetComputerStyle = window.getComputedStyle(props.target.element);

	const cloneElement = props.source.element.cloneNode(true) as HTMLElement;
	document.body.appendChild(cloneElement);

	for (const key in sourceComputerStyle) {
		if (cloneElement.style[key] === "") {
			cloneElement.style[key] = sourceComputerStyle[key];
		}
	}

	cloneElement.style.position = `absolute`;
	cloneElement.style.zIndex = `999`;
	cloneElement.style.left = `${props.source.x}px`;
	cloneElement.style.top = `${props.source.y}px`;
	cloneElement.style.width = `${sourceComputerStyle.width}`;
	cloneElement.style.height = `${sourceComputerStyle.height}`;

	requestAnimationFrame(() => {
		cloneElement.style.transition = `all ${props.millis}ms ease`;

		for (const key in targetComputerStyle) {
			if (cloneElement.style[key] === "") {
				cloneElement.style[key] = targetComputerStyle[key];
			}
		}

		cloneElement.style.left = `${props.target.x}px`;
		cloneElement.style.top = `${props.target.y}px`;
		cloneElement.style.width = `${targetComputerStyle.width}`;
		cloneElement.style.height = `${targetComputerStyle.height}`;

		setTimeout(() => {
			document.body.removeChild(cloneElement);
		}, props.millis);
	});
};
