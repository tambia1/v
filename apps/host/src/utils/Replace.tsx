import type React from "react";
import type { ReactNode } from "react";

type Props = {
	text: string;
	regexp: RegExp;
	matchCallback: (matches: RegExpMatchArray) => React.ReactNode;
};

export const replaceStringReact = ({ text, regexp, matchCallback }: Props) => {
	const result: React.ReactNode[] = [];

	const matches = text.matchAll(regexp);
	let lastIndex = 0;

	for (const match of matches) {
		const index = match.index || 0;

		if (index > lastIndex) {
			result.push(text.slice(lastIndex, index));
		}

		result.push(matchCallback(match));

		lastIndex = index + match[0].length;
	}

	if (lastIndex < text.length) {
		result.push(text.slice(lastIndex));
	}

	return result;
};

export const replaceString = (text: string, replacements: { [K: string]: ReactNode }) => {
	const pattern = new RegExp(`(${Object.keys(replacements).join("|")})`, "g");
	const split = text.split(pattern);
	const map = split.map((item) => replacements[item] || item);

	return map;
};
