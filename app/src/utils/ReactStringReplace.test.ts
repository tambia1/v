import { reactStringReplace } from "./ReactStringReplace";

vi.mock("console", () => {
	const originalConsoleLog = console.log;

	return {
		log: vi.fn().mockImplementation((...args) => {
			originalConsoleLog("mock", ...args);
		}),
	};
});

describe("replaceStringReact()", () => {
	test("Test mock", () => {
		console.log("test b");
	});

	test("string with marks and match", () => {
		expect(
			reactStringReplace({
				text: "abc <1>def</1> ghi <2>jkl</2> mno",
				regexp: /(<.+?>.*?<\/.+?>)/g,
				matchCallback: (match) => {
					return match[1];
				},
			})
		).toEqual(["abc ", "<1>def</1>", " ghi ", "<2>jkl</2>", " mno"]);
	});

	test("string with no marks", () => {
		expect(
			reactStringReplace({
				text: "abc def ghi jkl mno",
				regexp: /(<.+?>.*?<\/.+?>)/g,
				matchCallback: (match) => {
					return match[1];
				},
			})
		).toEqual(["abc def ghi jkl mno"]);
	});

	test("empty string", () => {
		expect(
			reactStringReplace({
				text: "",
				regexp: /(<.+?>.*?<\/.+?>)/g,
				matchCallback: (match) => {
					return match[1];
				},
			})
		).toEqual([]);
	});

	test("string with marks and no match", () => {
		expect(
			reactStringReplace({
				text: "abc <1>def</1> ghi <2>jkl</2> mno",
				regexp: /(#.*?#)/g,
				matchCallback: (match) => {
					return match[1];
				},
			})
		).toEqual(["abc <1>def</1> ghi <2>jkl</2> mno"]);
	});
});
