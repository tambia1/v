const fuzzySearch = (textToSearch: string, textToSearchInto: string) => {
	const matches = [];

	for (let i = 0, j = 0; i < textToSearch.length; i++) {
		for (; j < textToSearchInto.length; j++) {
			if (textToSearch[i].toLowerCase() == textToSearchInto[j].toLowerCase()) {
				matches.push(j);
				j++;

				break;
			}
		}
	}

	const result = matches.length == textToSearch.length ? matches : [];

	return result;
};

export const Search = {
	fuzzySearch,
};
