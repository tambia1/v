const users = {};

export const routes = {
	GET: {
		"/": (req, res) => root(req, res),
		"/hello": (req, res) => hello(req, res),
		"/setRedisKey": (req, res, redis) => setRedisKey(req, res, redis),
		"/getRedisKey": (req, res, redis) => getRedisKey(req, res, redis),
	},
	POST: {
		"/setToken": (req, res) => setToken(req, res),
		"/getToken": (req, res) => getToken(req, res),
	},
};

//http://localhost:5004
const root = (req, res) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/plain");
	res.end("Redis server running");
};

// http://localhost:5004/hello
const hello = (req, res) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/plain");
	res.end("Hello, World!");
};

const setToken = (req, res) => {
	let body = "";

	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const data = JSON.parse(body);
		const { userId, token } = data;
		users[userId] = token;
		res.statusCode = 200;
		res.setHeader("Content-Type", "application/json");
		res.end(JSON.stringify({ message: "Token set successfully" }));
	});
};

const getToken = (req, res, users) => {
	let body = "";

	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const data = JSON.parse(body);
		const { userId } = data;
		const token = users[userId];
		if (token) {
			res.statusCode = 200;
			res.setHeader("Content-Type", "application/json");
			res.end(JSON.stringify({ token }));
		} else {
			res.statusCode = 404;
			res.setHeader("Content-Type", "application/json");
			res.end(JSON.stringify({ error: "Token not found for user" }));
		}
	});
};

// http://localhost:5004/setRedisKey?value=123
const setRedisKey = async (req, res, redis) => {
	const url = new URL(req.url, `http://${req.headers.host}`);
	const value = url.searchParams.get("value");

	if (!value) {
		res.statusCode = 400;
		res.end(JSON.stringify({ error: "Missing parameters" }));

		return;
	}

	try {
		await redis.set("key", value);

		res.statusCode = 200;
		res.setHeader("Content-Type", "application/json");
		res.end(JSON.stringify({ message: "Key set successfully" }));
	} catch (error) {
		console.error("Error setting Redis key:", error);
		res.statusCode = 500;
		res.end(JSON.stringify({ error: "Internal Server Error" }));
	}
};

// http://localhost:5004/getRedisKey
const getRedisKey = async (req, res, redis) => {
	const value = await redis.get("key");

	res.statusCode = 200;
	res.setHeader("Content-Type", "application/json");
	res.end(JSON.stringify({ key: "key", value }));
};
