export type IRole = "guest" | "user" | "admin";

export type IUser = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	role: IRole;
};
