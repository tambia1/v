import http from "http";
import { routes } from "./routes.js";
import { log, colors } from "./log.js";
import url from "url";
import { createClient } from "redis";

const HOST_NAME = "localhost";
const PORT = 5004;

const redis = createClient({
	password: process.env.REDIS_PASSWORD,
	socket: {
		host: "redis-17425.c241.us-east-1-4.ec2.redns.redis-cloud.com",
		port: 17425,
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

server.listen(PORT, HOST_NAME, () => {
	log(colors.green, `Redis Server running at http://${HOST_NAME}:${PORT}/`);
});
