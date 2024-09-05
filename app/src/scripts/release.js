import { execSync } from "child_process";
import * as process from "process";
import * as fs from "fs";

function runBuild() {
	try {
		execSync("npm run build", { stdio: "inherit" });
	} catch (error) {
		console.error(`Error running build: ${error}`);
		process.exit(1);
	}
}

function commitAndPush(version) {
	try {
		execSync("git add .", { stdio: "inherit" });
		execSync(`git commit -m "Build ${version}"`, { stdio: "inherit" });
		execSync("git push", { stdio: "inherit" });
		execSync("git tag -d Live", { stdio: "inherit" });
		execSync("git push origin :refs/tags/Live", { stdio: "inherit" });
		execSync("git tag Live", { stdio: "inherit" });
		execSync("git push origin Live", { stdio: "inherit" });
	} catch (error) {
		console.error(`Error committing and pushing: ${error}`);
		process.exit(1);
	}
}

function readPackage() {
	let fileContent = fs.readFileSync("./package.json", "utf8");
	const json = JSON.parse(fileContent);

	return json;
}

function savePackage(json) {
	fs.writeFileSync("./package.json", JSON.stringify(json, null, 4), "utf8");
}

function incrementVersion(version) {
	let [_, major, minor, patch] = (version + "").match(/(\d+)\.?(\d+)\.?(\d+)/);

	patch = parseInt(patch) + 1;

	return `${major}.${minor}.${patch}`;
}

function release() {
	const packageJson = readPackage();
	const oldVersion = packageJson.version;
	const newVerion = incrementVersion(oldVersion);
	packageJson.version = newVerion;
	savePackage(packageJson);
	runBuild();
	commitAndPush(newVerion);

	console.log("\u001b[34m" + `realse version: ` + "\u001b[0m" + "\u001b[32m" + `${newVerion}` + "\u001b[0m");
}

release();
