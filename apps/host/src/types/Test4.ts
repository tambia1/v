/*


import { useChild } from "./UseChild";

export const useParent = () => {
	const { func2 } = useChild(UseParent);

	const func1 = () => {
		console.log("aaa", "func1");
	};

	return { func1, func2 };
};




import type { useParent } from "./UseParent";

export const useChild = <T extends typeof UseParent>(_t: T) => {
	const func2 = () => {
		console.log("aaa", "func2");
	};

	return { func2 };
};
*/
