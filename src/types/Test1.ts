interface Components {
	model1: {
		user: {
			names: {
				fisrtName: string;
				lastName: string;
			};

			height: number;
		};

		manager: {
			role: "ceo" | "cto" | "developer";
		};
	};
	model2: {
		parameters: {
			key: string;
			values: string;
		};
		databases: {
			name: string;
			size: number;
		};
	};
}

type Keys<T, U> = T extends string | number ? U : { [K in keyof T]: Keys<T[K], K> }[keyof T];
type KeysOfComponenets = Keys<Components, "">;

type MyModel1 = Components["model1"];
type MyModel2 = Components["model1"]["user"];
type MyUser = Components["model1"]["user"];
type MyDatabse = Components["model2"]["databases"];
type MyNames = Components["model1"]["user"]["names"];

type Type<U, T> = T extends keyof U ? U[T] : U extends string | number ? never : { [K in keyof U]: Type<U[K], T> }[keyof U];

type AModel1 = Type<Components, "model1">;
type AModel2 = Type<Components, "model2">;
type AUser = Type<Components, "user">;
type ADatabase = Type<Components, "databases">;
type ANames = Type<Components, "names">;

const components: Components = {} as Components;
type BModel1 = typeof components.model1;
type BModel2 = typeof components.model2;
type BUser = typeof components.model1.user;
type BDatabase = typeof components.model2.databases;
type BNames = typeof components.model1.user.names;

type ThemeName = "light" | "dark";
const themes1: { [key in ThemeName]: number } = { light: 0, dark: 1 };

type TypeToObject<T extends string> = { [key in T]: 0 };
type Theme2 = TypeToObject<ThemeName>;
const theme: Theme2 = { dark: 0, light: 0 };
