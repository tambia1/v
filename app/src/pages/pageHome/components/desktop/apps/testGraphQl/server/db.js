let games = [
	{ id: "1", title: "Zelda", platforms: ["Switch"] },
	{ id: "2", title: "Final Fantasy 7", platforms: ["PS5", "Xbox"] },
	{ id: "3", title: "Elden Ring", platforms: ["PS5", "Xbox", "PC"] },
	{ id: "4", title: "Mario", platforms: ["Switch"] },
	{ id: "5", title: "Pokimon", platforms: ["PS5", "Xbox", "PC"] },
];

let authors = [
	{ id: "1", name: "mario" },
	{ id: "2", name: "yoshi" },
	{ id: "3", name: "peach" },
];

let reviews = [
	{ id: "1", rating: 9, content: "some content", authorId: "1", gameId: "2" },
	{ id: "2", rating: 10, content: "some content", authorId: "2", gameId: "1" },
	{ id: "3", rating: 7, content: "some content", authorId: "3", gameId: "3" },
	{ id: "4", rating: 5, content: "some content", authorId: "2", gameId: "4" },
	{ id: "5", rating: 8, content: "some content", authorId: "2", gameId: "5" },
	{ id: "6", rating: 7, content: "some content", authorId: "1", gameId: "2" },
	{ id: "7", rating: 10, content: "some content", authorId: "3", gameId: "1" },
];

export default { games, authors, reviews };
