import { execSync } from "child_process";
import { version } from "./package.json";
import * as process from "process";

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

function commitAndPush() {
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

function release() {
	increaseVersion();
	runBuild();
	commitAndPush();
}

release();
