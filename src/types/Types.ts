export type GetTypeKeys<T, U = ""> = T extends object ? { [K in keyof T]: GetTypeKeys<T[K], K> }[keyof T] : U;
export type GetTypeKeysPath<T, P extends string = ""> = T extends object ? { [K in keyof T]: GetTypeKeysPath<T[K], `${P}${K & string}.`> }[keyof T] : P extends `${infer Prefix}.` ? Prefix : P;
export type GetObjectValues<T> = T extends object ? { [K in keyof T]: GetObjectValues<T[K]> }[keyof T] : T;
export type GetTypeAsObject<T> = T extends object ? { [K in keyof T]: T[K] extends object ? GetTypeAsObject<T[K]> : K } : T;
export type GetTypeByKey<U, T> = T extends keyof U ? U[T] : U extends string | number ? never : { [K in keyof U]: GetTypeByKey<U[K], T> }[keyof U];

// examples
type ILanguage = {
	languageName: "en" | "fi";
	pageMenu: {
		logout: {
			alertText: string;
			alertButtonYes: string;
			alertButtonNo: string;
		};
	};
};

const language = {
	languageName: "aaa",
	pageMenu: {
		logout: {
			alertText: "bbb",
			alertButtonYes: "ccc",
			alertButtonNo: "ddd",
		},
	},
} as const;

const sizes = ["xs", "s", "m", "l", "xl"] as const;

type aaa = GetTypeKeys<ILanguage>;
// type aaa = "languageName" | "alertText" | "alertButtonYes" | "alertButtonNo" | "title" | "apearance" | "language" | "theme" | "about"

type bbb = GetTypeKeysPath<ILanguage>;
// type bbb = "languageName" | "pageMenu.logout.alertText" | "pageMenu.logout.alertButtonYes" | "pageMenu.logout.alertButtonNo" | "settings.title" | "settings.apearance" | "settings.language" | "settings.theme" | "settings.about"

type ccc = GetObjectValues<typeof language>;
// type ccc = "aaa" | "bbb" | "ccc" | "ddd"

type ddd = GetTypeAsObject<ILanguage>;
// type ddd = {
//     languageName: "languageName";
//     pageMenu: {
//         logout: {
//             alertText: "alertText";
//              alertButtonYes: "alertButtonYes";
//              alertButtonNo: "alertButtonNo";
//         };
//     };
// }

const ddd_1 = {} as ddd;
const ddd_2 = ddd_1.pageMenu.logout.alertButtonYes;
// const ddd_2 = ddd_1.pageMenu.logout.alertButtonYes;

const ddd_3 = {} as ILanguage;
const ddd_4 = ddd_3.pageMenu.logout.alertButtonYes;
// const ddd_4: string;

type eee = GetTypeByKey<ILanguage, "logout">;
// type eee = {
//     alertText: string;
//     alertButtonYes: string;
//     alertButtonNo: string;
// }

type ISize = (typeof sizes)[number];
// type ISize = "xs" | "s" | "m" | "l" | "xl"
const Sizes = {} as { readonly [K in ISize]: K };
// const Sizes: {
//     readonly xs: "xs";
//     readonly s: "s";
//     readonly m: "m";
//     readonly l: "l";
//     readonly xl: "xl";
// }
