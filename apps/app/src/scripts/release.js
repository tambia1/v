import { execSync } from "child_process";
import * as process from "process";
import * as fs from "fs";
import * as path from "path";

function increaseVersion() {
	try {
		execSync("npm version patch", { stdio: "inherit" });
	} catch (error) {
		console.error(`Error increasing version: ${error}`);
		process.exit(1);
	}
}

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

function getPackageVersion() {
	const packageJsonPath = path.join(new URL("../../package.json", import.meta.url).pathname);
	const packageJsonContent = fs.readFileSync(packageJsonPath, "utf-8");
	const packageJson = JSON.parse(packageJsonContent);

	return packageJson.version;
}

function release(process) {
	increaseVersion();
	runBuild();
	const version = getPackageVersion();
	commitAndPush(version);
}

release(process);
