import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import db from "./db.js";

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
			return db.games.find((g) => g.id === parent.id);
		},

		author(parent) {
			return db.authors.find((a) => a.id === parent.id);
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
	listen: { port: 4000 },
});

console.log("GraphQL server ready at port 4000");
