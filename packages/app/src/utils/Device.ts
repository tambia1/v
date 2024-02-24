const preventIosDoubleClickToZoom = () => {
	let lastTouchEnd = 0;

	document.addEventListener(
		"touchend",
		function (e) {
			const now = new Date().getTime();
			if (now - lastTouchEnd <= 300) {
				e.preventDefault();
			}
			lastTouchEnd = now;
		},
		false
	);
};

const preventDesktopContextMenu = () => {
	const deviceType = typeof window.orientation !== "undefined" || navigator.userAgent.indexOf("Mobile") !== -1 ? "Mobile" : "Desktop";

	if (deviceType == "Desktop") {
		document.body.onselectstart = function () {
			return false;
		};
		document.body.oncontextmenu = function () {
			return false;
		};
	}
};

const preventDesktopRightClick = () => {
	document.addEventListener(
		"mousedown",
		function (e) {
			if (e.which > 1) {
				e.stopPropagation();
			}
		},
		true
	);
};

export const Device = {
	preventIosDoubleClickToZoom,
	preventDesktopContextMenu,
	preventDesktopRightClick,
};
