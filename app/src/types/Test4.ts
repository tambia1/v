/*


import { UseChild } from "./UseChild";

export const UseParent = () => {
	const { func2 } = UseChild(UseParent);

	const func1 = () => {
		console.log("aaa", "func1");
	};

	return { func1, func2 };
};




import type { UseParent } from "./UseParent";

export const UseChild = <T extends typeof UseParent>(_t: T) => {
	const func2 = () => {
		console.log("aaa", "func2");
	};

	return { func2 };
};
*/
