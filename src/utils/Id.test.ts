import { getId } from "./Id";

test("getId() generates unique IDs", () => {
	const id0 = getId();
	const id1 = getId();

	expect(id0).not.toBe(id1);
});
