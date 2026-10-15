//#region \0vite/preload-helper.js
var scriptRel = "modulepreload";
var assetsURL = function(dep) {
	return "/v/" + dep;
};
var seen$1 = {};
var isCssPreloadUrl = function isCssPreloadUrl(url) {
	return url.pathname.endsWith(".css");
};
var preloadOnce = function preloadOnce(seen, href, preload) {
	if (href in seen) return seen[href];
	const promise = preload();
	if (!promise) {
		seen[href] = void 0;
		return;
	}
	const preloadPromise = promise.then(() => {
		seen[href] = void 0;
	}, (err) => {
		seen[href] = void 0;
		throw err;
	});
	seen[href] = preloadPromise;
	return preloadPromise;
};
var __vitePreload = function preload(baseModule, deps, importerUrl) {
	let promise = Promise.resolve();
	if (deps && deps.length > 0) {
		let preloadedHrefs;
		const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
		const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
		function allSettled(promises) {
			return Promise.all(promises.map((p) => Promise.resolve(p).then((value) => ({
				status: "fulfilled",
				value
			}), (reason) => ({
				status: "rejected",
				reason
			}))));
		}
		function importMetaResolve(specifier) {
			if (import.meta.resolve) return new URL(import.meta.resolve(specifier));
			return new URL(specifier, import.meta.url);
		}
		promise = allSettled(deps.map((depString) => {
			depString = assetsURL(depString, importerUrl);
			const dep = importMetaResolve(depString);
			const isCss = isCssPreloadUrl(dep);
			return preloadOnce(seen$1, dep.href, () => {
				if (preloadedHrefs === void 0) {
					preloadedHrefs = {
						all: /* @__PURE__ */ new Set(),
						styles: /* @__PURE__ */ new Set()
					};
					const links = document.getElementsByTagName("link");
					for (let i = links.length - 1; i >= 0; i--) {
						const link = links[i];
						preloadedHrefs.all.add(link.href);
						if (link.rel === "stylesheet") preloadedHrefs.styles.add(link.href);
					}
				}
				if ((isCss ? preloadedHrefs.styles : preloadedHrefs.all).has(dep.href)) return;
				const link = document.createElement("link");
				link.rel = isCss ? "stylesheet" : scriptRel;
				if (!isCss) link.as = "script";
				link.crossOrigin = "";
				link.href = dep.href;
				if (cspNonce) link.setAttribute("nonce", cspNonce);
				document.head.appendChild(link);
				if (isCss) return new Promise((res, rej) => {
					link.addEventListener("load", res);
					link.addEventListener("error", () => rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`)));
				});
			});
		}).filter((p) => p !== void 0));
	}
	function handlePreloadError(err) {
		const e = new Event("vite:preloadError", { cancelable: true });
		e.payload = err;
		window.dispatchEvent(e);
		if (!e.defaultPrevented) throw err;
	}
	return promise.then((res) => {
		for (const item of res || []) {
			if (item.status !== "rejected") continue;
			handlePreloadError(item.reason);
		}
		return baseModule().catch(handlePreloadError);
	});
};
//#endregion
//#region \0virtual:__remoteEntryHelper__remote.js
var currentImports = {};
var exportSet = /* @__PURE__ */ new Set([
	"Module",
	"__esModule",
	"default",
	"_export_sfc"
]);
var moduleMap = { "./Mfe": () => {
	dynamicLoadingCss(["style-yutavFy1.css"], false, "./Mfe");
	return __federation_import("/v/assets/__federation_expose_Mfe-BeljZY_Y.js").then((module) => Object.keys(module).every((item) => exportSet.has(item)) ? () => module.default : () => module);
} };
var seen = {};
var dynamicLoadingCss = (cssFilePaths, dontAppendStylesToHead, exposeItemName) => {
	const metaUrl = import.meta.url;
	if (typeof metaUrl === "undefined") {
		console.warn("The remote style takes effect only when the build.target option in the vite.config.ts file is higher than that of \"es2020\".");
		return;
	}
	const curUrl = metaUrl.substring(0, metaUrl.lastIndexOf("remote.js"));
	const base = '/v/';
	'assets';
	cssFilePaths.forEach((cssPath) => {
		let href = "";
		const baseUrl = base || curUrl;
		if (baseUrl) {
			const trimmer = {
				trailing: (path) => path.endsWith("/") ? path.slice(0, -1) : path,
				leading: (path) => path.startsWith("/") ? path.slice(1) : path
			};
			const isAbsoluteUrl = (url) => url.startsWith("http") || url.startsWith("//");
			const cleanBaseUrl = trimmer.trailing(baseUrl);
			const cleanCssPath = trimmer.leading(cssPath);
			const cleanCurUrl = trimmer.trailing(curUrl);
			if (isAbsoluteUrl(baseUrl)) href = [cleanBaseUrl, cleanCssPath].filter(Boolean).join("/");
			else if (cleanCurUrl.includes(cleanBaseUrl)) href = [cleanCurUrl, cleanCssPath].filter(Boolean).join("/");
			else href = [cleanCurUrl + cleanBaseUrl, cleanCssPath].filter(Boolean).join("/");
		} else href = cssPath;
		if (dontAppendStylesToHead) {
			const key = "css__frontend__" + exposeItemName;
			window[key] = window[key] || [];
			window[key].push(href);
			return;
		}
		if (href in seen) return;
		seen[href] = true;
		const element = document.createElement("link");
		element.rel = "stylesheet";
		element.href = href;
		document.head.appendChild(element);
	});
};
async function __federation_import(name) {
	currentImports[name] ??= __vitePreload(() => import(name), []);
	return currentImports[name];
}
var get = (module) => {
	if (!moduleMap[module]) throw new Error("Can not find remote module " + module);
	return moduleMap[module]();
};
var init = (shareScope) => {
	globalThis.__federation_shared__ = globalThis.__federation_shared__ || {};
	Object.entries(shareScope).forEach(([key, value]) => {
		for (const [versionKey, versionValue] of Object.entries(value)) {
			const scope = versionValue.scope || "default";
			globalThis.__federation_shared__[scope] = globalThis.__federation_shared__[scope] || {};
			const shared = globalThis.__federation_shared__[scope];
			(shared[key] = shared[key] || {})[versionKey] = versionValue;
		}
	});
};
//#endregion
export { dynamicLoadingCss, get, init };
