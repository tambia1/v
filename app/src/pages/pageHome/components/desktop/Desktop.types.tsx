export type Role = "guest" | "user" | "admin";

export type User = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	role: Role;
};
