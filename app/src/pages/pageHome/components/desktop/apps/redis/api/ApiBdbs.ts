import { mutateCreateBdb } from "./bdb/mutateCreateBdb";
import { mutateDeleteBdb } from "./bdb/mutateDeleteBdb";
import { quryBdbs } from "./bdb/queryBdbs";

export const ApiBdb = {
	quryBdbs,
	mutateCreateBdb,
	mutateDeleteBdb,
};
