export const getPublicIPv6Address = async () => {
	try {
		const response = await fetch("https://api64.ipify.org?format=json");
		const data = await response.json();

		return data.ip;
	} catch (error) {
		console.error("Error fetching IPv6 address:", error);
	}
};
