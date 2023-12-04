import { Promises } from "@src/services/Promises";
import { LoginType, LogoutType } from "./QueryLogin";
import { UserType } from "./QueryUser";

const DELAY = 1000;

export const sendLogin = async (email: string, password: string): Promise<LoginType> => {
	await Promises.sleep(DELAY);

	const result: LoginType = {
		error: 0,
		message: "",
		token: "12345",
	};

	if (email !== "a" || password !== "a") {
		result.error = 1;
		result.message = "invalid name or password";
		result.token = "";
	}

	return result;
};

export const sendLogout = async (): Promise<LogoutType> => {
	await Promises.sleep(DELAY);

	const result: LogoutType = {
		error: 0,
		message: "",
	};

	return result;
};

export const getUser = async (token: string, userId: string): Promise<UserType> => {
	await Promises.sleep(DELAY);

	const result: UserType = {
		error: 0,
		message: "",
		firstName: "",
		lastName: "",
		email: "",
	};

	if (token !== "12345") {
		result.error = 1;
		result.message = "unauthorized";
	}

	if (userId !== "1") {
		result.error = 2;
		result.message = "user not found";
	}

	result.error = 0;
	result.message = "";
	result.firstName = "John";
	result.lastName = "Doe";
	result.email = "JohnDoes@email.com";

	return result;
};
