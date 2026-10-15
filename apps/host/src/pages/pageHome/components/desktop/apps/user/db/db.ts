import { User } from "../../../Desktop.types";

export const dbUsers: { [userId in string]: User } = {
	user_1: {
		email: "a",
		password: "a",
		firstName: "John",
		lastName: "Admin",
		role: "admin",
	},
	user_2: {
		email: "b",
		password: "b",
		firstName: "Jane",
		lastName: "User",
		role: "user",
	},
	user_3: {
		email: "c",
		password: "c",
		firstName: "Jimi",
		lastName: "Admin",
		role: "admin",
	},
};

export const dbTokens: { [token in string]: { userId: string; time: number } } = {
	token_0: { userId: "user_0", time: 0 },
};
