export type GetTypeKeys<T, U = ""> = T extends object ? { [K in keyof T]: GetTypeKeys<T[K], K> }[keyof T] : U;
export type GetTypeKeysPath<T, P extends string = ""> = T extends object
	? { [K in keyof T]: GetTypeKeysPath<T[K], `${P}${K & string}.`> }[keyof T]
	: P extends `${infer Prefix}.`
		? Prefix
		: P;
export type GetTypeKeysAsArray<T, P extends string[] = []> = T extends object ? { [K in keyof T]: GetTypeKeysAsArray<T[K], [...P, K & string]> }[keyof T] : P;
export type GetObjectValues<T> = T extends object ? { [K in keyof T]: GetObjectValues<T[K]> }[keyof T] : T;
export type GetTypeAsObject<T> = T extends object ? { [K in keyof T]: T[K] extends object ? GetTypeAsObject<T[K]> : K } : T;
export type GetTypeAsObjectPath<T, P extends string = ""> = T extends object
	? { [K in keyof T]: T[K] extends object ? GetTypeAsObjectPath<T[K], `${P}${K & string}.`> : `${P}${K & string}` }
	: never;
export type GetTypeAsObjectArray<T, P extends string[] = []> = T extends object
	? { [K in keyof T]: T[K] extends object ? GetTypeAsObjectArray<T[K], [...P, K & string]> : [...P, K & string] }
	: never;
export type GetTypeByKey<U, T> = T extends keyof U ? U[T] : U extends string | number ? never : { [K in keyof U]: GetTypeByKey<U[K], T> }[keyof U];

// // examples
// type Language = {
// 	languageName: "en" | "fi";
// 	pageMenu: {
// 		logout: {
// 			alertText: string;
// 			alertButtonYes: string;
// 			alertButtonNo: string;
// 		};
// 	};
// };

// const language = {
// 	languageName: "aaa",
// 	pageMenu: {
// 		logout: {
// 			alertText: "bbb",
// 			alertButtonYes: "ccc",
// 			alertButtonNo: "ddd",
// 		},
// 	},
// } as const;

// const sizes = ["xs", "s", "m", "l", "xl"] as const;

// type aaa = GetTypeKeys<Language>;
// // type aaa = "languageName" | "alertText" | "alertButtonYes" | "alertButtonNo" | "title" | "apearance" | "language" | "theme" | "about"

// type bbb = GetTypeKeysPath<Language>;
// type bbb = "languageName" | "pageMenu.logout.alertText" | "pageMenu.logout.alertButtonYes" | "pageMenu.logout.alertButtonNo" | "settings.title" | "settings.apearance" | "settings.language" | "settings.theme" | "settings.about"
// type bbb_1 = GetTypeAsObjectPath<Language>;
// type bbb_2 = GetTypeAsObjectArray<Language>;
// type bbb_2 = {
//     languageName: ["languageName"];
//     pageMenu: {
//         logout: {
//             alertText: ["pageMenu", "logout", "alertText"];
//             alertButtonYes: ["pageMenu", "logout", "alertButtonYes"];
//             alertButtonNo: ["pageMenu", "logout", "alertButtonNo"];
//         };
//     };
// }

// type bbb_1 = GetTypeKeysAsArray<Language>;
// // type bbb_1 = ["languageName"] | ["pageMenu", "logout", "alertText"] | ["pageMenu", "logout", "alertButtonYes"] | ["pageMenu", "logout", "alertButtonNo"]

// type bbb_2 = GetTypeKeysAsArray<Language>;
// type bbb_1 = ["languageName"] | ["pageMenu", "logout", "alertText"] | ["pageMenu", "logout", "alertButtonYes"] | ["pageMenu", "logout", "alertButtonNo"]

// type ccc = GetObjectValues<typeof language>;
// // type ccc = "aaa" | "bbb" | "ccc" | "ddd"

// type ddd = GetTypeAsObject<Language>;
// // type ddd = {
// //     languageName: "languageName";
// //     pageMenu: {
// //         logout: {
// //             alertText: "alertText";
// //              alertButtonYes: "alertButtonYes";
// //              alertButtonNo: "alertButtonNo";
// //         };
// //     };
// // }

// const ddd_1 = {} as ddd;
// const ddd_2 = ddd_1.pageMenu.logout.alertButtonYes;
// // const ddd_2 = "alertButtonYes";

// const ddd_3 = {} as Language;
// const ddd_4 = ddd_3.pageMenu.logout.alertButtonYes;
// // const ddd_4: string;

// type eee = GetTypeByKey<Language, "logout">;
// // type eee = {
// //     alertText: string;
// //     alertButtonYes: string;
// //     alertButtonNo: string;
// // }

// type Size = (typeof sizes)[number];
// // type Size = "xs" | "s" | "m" | "l" | "xl"
// const Sizes = {} as { readonly [K in Size]: K };
// // const Sizes: {
// //     readonly xs: "xs";
// //     readonly s: "s";
// //     readonly m: "m";
// //     readonly l: "l";
// //     readonly xl: "xl";
// // }
// const fff_1: Size = "s";
// const fff_2: Size = Sizes.s;
// // const fff: "s"
