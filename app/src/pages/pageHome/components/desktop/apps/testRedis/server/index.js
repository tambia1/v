import http from "http";
import { routes } from "./routes.js";
import { log, colors } from "./log.js";
import url from "url";
import { createClient } from "redis";
import { exit } from "process";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const VITE_REDIS_PASSWORD = process.env.VITE_REDIS_PASSWORD;

const HOST = "2a06:c701:9c56:3300:d296:7032:edab:4e6b";
const PORT = 5004;

const redis = createClient({
	password: VITE_REDIS_PASSWORD,
	socket: {
		host: "redis-10247.c226.eu-west-1-3.ec2.redns.redis-cloud.com",
		port: 10247,
	},
});

redis.on("connect", () => {
	console.log("Connected to Redis");
});

redis.on("error", (err) => {
	console.error("Redis Error: " + err);
});

await redis.connect();

const server = http.createServer(async (req, res) => {
	const { method, url: reqUrl } = req;

	log(colors.yellow, `Request ${reqUrl}`);

	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");

	if (method === "OPTIONS") {
		res.writeHead(204);
		res.end();

		return;
	}

	const { pathname } = url.parse(reqUrl);
	const routeHandler = routes[method][pathname];

	if (routeHandler) {
		routeHandler(req, res, redis);
	} else {
		res.statusCode = 404;
		res.setHeader("Content-Type", "application/json");
		res.end(JSON.stringify({ error: "Route not found" }));
	}
});

server.listen(PORT, HOST, async () => {
	log(colors.green, `Redis Server running at http://${HOST}:${PORT}/`);

	try {
		const ping = await redis.ping();
		log(colors.yellow, `Redis - ping ${ping}`);
	} catch (error) {
		log(colors.red, `Redis - ${error}`);
		exit(1);
	}
});
