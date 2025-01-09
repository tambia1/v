const preventIosDoubleClickToZoom = () => {
	let lastTouchEnd = 0;

	document.addEventListener(
		"touchend",
		(e) => {
			const now = new Date().getTime();
			if (now - lastTouchEnd <= 300) {
				e.preventDefault();
			}
			lastTouchEnd = now;
		},
		false,
	);
};

const preventDesktopContextMenu = () => {
	const deviceType = typeof window.orientation !== "undefined" || navigator.userAgent.indexOf("Mobile") !== -1 ? "Mobile" : "Desktop";

	if (deviceType === "Desktop" || deviceType === "Mobile") {
		document.body.onselectstart = () => false;
		document.body.oncontextmenu = () => false;
	}
};

const preventDesktopRightClick = () => {
	document.addEventListener(
		"mousedown",
		(e) => {
			if (e.which > 1) {
				e.stopPropagation();
			}
		},
		true,
	);
};

const getDeviceInfo = () => {
	const ua = navigator.userAgent;

	let deviceName = "Unknown Device";
	let iosName = "";
	let iosVersion = "";
	let browserName = "Unknown Browser";
	let browserVersion = "";

	if (/iPad|iPhone|iPod/.test(ua)) {
		iosName = "iOS";

		const versionMatch = ua.match(/OS (\d+_\d+)/);
		iosVersion = versionMatch ? versionMatch[1].replace("_", ".") : "Unknown";

		if (/iPhone/.test(ua)) {
			deviceName = "iPhone";
		} else if (/iPad/.test(ua)) {
			deviceName = "iPad";
		} else if (/iPod/.test(ua)) {
			deviceName = "iPod";
		} else {
			deviceName = "Apple Device";
		}
	} else if (/Android/.test(ua)) {
		iosName = "Android";
		deviceName = "Android Device";
	} else if (/Windows/.test(ua)) {
		deviceName = "Windows Device";
	} else if (/Macintosh/.test(ua)) {
		deviceName = "Mac Device";
	}

	if (/Chrome/.test(ua) && !/Edge/.test(ua)) {
		browserName = "Chrome";
		const versionMatch = ua.match(/Chrome\/(\d+\.\d+)/);
		browserVersion = versionMatch ? versionMatch[1] : "Unknown";
	} else if (/Firefox/.test(ua)) {
		browserName = "Firefox";
		const versionMatch = ua.match(/Firefox\/(\d+\.\d+)/);
		browserVersion = versionMatch ? versionMatch[1] : "Unknown";
	} else if (/Safari/.test(ua) && !/Chrome/.test(ua)) {
		browserName = "Safari";
		const versionMatch = ua.match(/Version\/(\d+\.\d+)/);
		browserVersion = versionMatch ? versionMatch[1] : "Unknown";
	} else if (/Edge/.test(ua)) {
		browserName = "Edge";
		const versionMatch = ua.match(/Edge\/(\d+\.\d+)/);
		browserVersion = versionMatch ? versionMatch[1] : "Unknown";
	} else if (/MSIE/.test(ua) || /Trident/.test(ua)) {
		browserName = "Internet Explorer";
		const versionMatch = ua.match(/(MSIE \d+.\d+|rv:\d+.\d+)/);
		browserVersion = versionMatch ? versionMatch[1].replace(/MSIE |rv:/, "") : "Unknown";
	}

	const isMobile = /Mobi/.test(ua);
	const isTablet = /Tablet/.test(ua) || (/iPad/.test(ua) && !/Mobile/.test(ua));
	const isDesktop = !isMobile && !isTablet;

	return {
		deviceName,
		iosName,
		iosVersion,
		browserName,
		browserVersion,
		isMobile,
		isTablet,
		isDesktop,
	};
};

export const Device = {
	preventIosDoubleClickToZoom,
	preventDesktopContextMenu,
	preventDesktopRightClick,
	getDeviceInfo,
};
