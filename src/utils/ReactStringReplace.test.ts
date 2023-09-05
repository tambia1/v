import { reactStringReplace } from "./ReactStringReplace";

describe("replaceStringReact()", () => {
	test("string with marks and match", () => {
		expect(
			reactStringReplace("abc <1>def</1> ghi <2>jkl</2> mno", /(<.+?>.*?<\/.+?>)/g, (match) => {
				return match[1];
			})
		).toEqual(["abc ", "<1>def</1>", " ghi ", "<2>jkl</2>", " mno"]);
	});

	test("string with no marks", () => {
		expect(
			reactStringReplace("abc def ghi jkl mno", /(<.+?>.*?<\/.+?>)/g, (match) => {
				return match[1];
			})
		).toEqual(["abc def ghi jkl mno"]);
	});

	test("empty string", () => {
		expect(
			reactStringReplace("", /(<.+?>.*?<\/.+?>)/g, (match) => {
				return match[1];
			})
		).toEqual([]);
	});

	test("string with marks and no match", () => {
		expect(
			reactStringReplace("abc <1>def</1> ghi <2>jkl</2> mno", /(#.*?#)/g, (match) => {
				return match[1];
			})
		).toEqual(["abc <1>def</1> ghi <2>jkl</2> mno"]);
	});
});
