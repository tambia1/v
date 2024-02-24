import { getUniqueId } from "./UniqueId";

test("getId() generates unique IDs", () => {
	const id0 = getUniqueId();
	const id1 = getUniqueId();

	expect(id0).not.toBe(id1);
});
