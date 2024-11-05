/// <reference types="vite/client" />

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
	readonly VITE_THEME: "light" | "dark";
	readonly VITE_LANGUAGE: string;

	readonly VITE_GOOGLE_AUTH: string;

	readonly VITE_REDIS_PASSWORD: string;
}
