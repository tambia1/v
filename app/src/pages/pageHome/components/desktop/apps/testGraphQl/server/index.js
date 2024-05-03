import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import db from "./db.js";

const COLOR = {
	grey: 30,
	red: 31,
	green: 32,
	yellow: 33,
	blue: 34,
	purple: 35,
	cyan: 36,
};

function log(color, message) {
	console.log("\u001b[" + color + "m" + message + "\u001b[0m");
}

const PORT = 6001;

const resolvers = {
	Query: {
		games() {
			return db.games;
		},
		game(_parent, args) {
			return db.games.find((game) => game.id === args.id);
		},

		authors() {
			return db.authors;
		},
		author(_parent, args) {
			return db.authors.find((author) => author.id === args.id);
		},

		reviews() {
			return db.reviews;
		},
		review(_parent, args) {
			return db.reviews.find((review) => review.id === args.id);
		},
	},

	Game: {
		reviews(parent) {
			return db.reviews.filter((r) => r.gameId === parent.id);
		},
	},

	Author: {
		reviews(parent) {
			return db.reviews.filter((r) => r.authorId === parent.id);
		},
	},

	Review: {
		game(parent) {
			return db.games.find((g) => g.id === parent.gameId);
		},

		author(parent) {
			return db.authors.find((a) => a.id === parent.authorId);
		},
	},

	Mutation: {
		deleteGame(_parent, args) {
			db.games = db.games.filter((g) => g.id !== args.id);

			return db.games;
		},
		addGame(_parent, args) {
			const game = {
				...args.game,
				id: ~~(Math.random() * 1000),
			};

			db.games.push(game);

			return game;
		},
		updateGame(_parent, args) {
			db.games = db.games.map((g) => {
				if (g.id === args.id) {
					return { ...g, ...args.edits };
				}

				return g;
			});

			return db.games.find((g) => g.id === args.id);
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const { url } = await startStandaloneServer(server, {
	listen: { port: PORT },
});

log(COLOR.green, `GraphQL server running at port ${PORT}`);
