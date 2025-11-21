import { replaceString, replaceStringReact } from "./Replace";

vi.mock("console", () => {
	const originalConsoleLog = console.log;

	return {
		log: vi.fn().mockImplementation((...args) => {
			originalConsoleLog("mock", ...args);
		}),
	};
});

describe("Replace", () => {
	describe("replaceStringReact()", () => {
		test("string with marks and match", () => {
			expect(
				replaceStringReact({
					text: "abc <1>def</1> ghi <2>jkl</2> mno",
					regexp: /(<.+?>.*?<\/.+?>)/g,
					matchCallback: (match) => {
						return match[1];
					},
				}),
			).toEqual(["abc ", "<1>def</1>", " ghi ", "<2>jkl</2>", " mno"]);
		});

		test("string with no marks", () => {
			expect(
				replaceStringReact({
					text: "abc def ghi jkl mno",
					regexp: /(<.+?>.*?<\/.+?>)/g,
					matchCallback: (match) => {
						return match[1];
					},
				}),
			).toEqual(["abc def ghi jkl mno"]);
		});

		test("empty string", () => {
			expect(
				replaceStringReact({
					text: "",
					regexp: /(<.+?>.*?<\/.+?>)/g,
					matchCallback: (match) => {
						return match[1];
					},
				}),
			).toEqual([]);
		});

		test("string with marks and no match", () => {
			expect(
				replaceStringReact({
					text: "abc <1>def</1> ghi <2>jkl</2> mno",
					regexp: /(#.*?#)/g,
					matchCallback: (match) => {
						return match[1];
					},
				}),
			).toEqual(["abc <1>def</1> ghi <2>jkl</2> mno"]);
		});
	});

	describe("replaceString()", () => {
		test("string with marks and match", () => {
			expect(
				replaceString("This is a {link} for test", {
					"{link}": <a href="google.com">Link</a>,
					test: "testing.",
				}),
			).toMatchInlineSnapshot(`
				[
				  "This is a ",
				  <a
				    href="google.com"
				  >
				    Link
				  </a>,
				  " for ",
				  "testing.",
				  "",
				]
			`);
		});
	});
});
