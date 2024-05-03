import { Promises } from "@src/services/Promises";
import { MutateLoginResult, MutateLogoutResult, MutateTokenResult } from "./QueryLogin";
import { QueryUserResult } from "./QueryUser";
import { dbTokens, dbUsers } from "../db/db";

const DELAY = 1000;

export const sendLogin = async (email: string, password: string): Promise<MutateLoginResult> => {
	await Promises.sleep(DELAY);

	const userId = Object.keys(dbUsers).find((userId) => dbUsers[userId].email === email && dbUsers[userId].password === password);

	const result: MutateLoginResult = {
		error: 0,
		message: "",
		token: "",
	};

	if (!userId) {
		result.error = 1;
		result.message = "invalid name or password";
	} else {
		const token = "token_" + Math.floor(Math.random() * 1_000_000);

		dbTokens[token] = { userId, time: Date.now() };
		result.token = token;
	}

	return result;
};

export const sendLogout = async (token: string): Promise<MutateLogoutResult> => {
	await Promises.sleep(DELAY);

	const result: MutateLogoutResult = {
		error: 0,
		message: "",
	};

	if (!dbTokens[token]) {
		result.error = 1;
		result.message = "invalid token";
	} else {
		delete dbTokens[token];
	}

	return result;
};

export const sendToken = async (token: string): Promise<MutateTokenResult> => {
	const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const userInfo = await response.json();
	userInfo.email = "c";

	const userId = Object.keys(dbUsers).find((userId) => dbUsers[userId].email === userInfo.email);

	const result: MutateLoginResult = {
		error: 0,
		message: "",
		token: "",
	};

	if (!userId) {
		result.error = 1;
		result.message = "invalid name or password";
	} else {
		dbTokens[token] = { userId, time: Date.now() };
		result.token = token;
	}

	return result;
};

export const getUser = async (token: string): Promise<QueryUserResult> => {
	await Promises.sleep(DELAY);

	const result: QueryUserResult = {
		error: 0,
		message: "",
		firstName: "",
		lastName: "",
		email: "",
		role: "guest",
	};

	if (!token) {
		result.error = 1;
		result.message = "token is empty";
	} else if (!dbTokens[token]) {
		result.error = 2;
		result.message = "unauthorized";
	} else if (!dbUsers[dbTokens[token].userId]) {
		result.error = 3;
		result.message = "user not found";
	} else {
		const userId = dbTokens[token].userId;

		result.firstName = dbUsers[userId].firstName;
		result.lastName = dbUsers[userId].lastName;
		result.email = dbUsers[userId].email;
		result.role = dbUsers[userId].role;
	}

	return result;
};
