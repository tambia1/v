export const getUniqueId = () => {
	return String(Math.floor(Math.random() * 1_000_000_000));
};