import { getUniqueId } from "./UniqueId";

const originalConsoleLog = console.log;

vi.spyOn(console, "log").mockImplementation((...args) => {
	originalConsoleLog("spyOn", args);
});

test("test spyOn", () => {
	console.log("test a");
});

test("getId() generates unique IDs", () => {
	const id0 = getUniqueId();
	const id1 = getUniqueId();

	expect(id0).not.toBe(id1);
});
