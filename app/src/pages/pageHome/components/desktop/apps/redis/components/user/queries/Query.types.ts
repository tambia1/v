export type QueryResult<ResponseType> = {
	error: number;
	message: string;
	response?: ResponseType;
};
