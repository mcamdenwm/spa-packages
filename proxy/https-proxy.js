const fs = require("fs");
const proxy = require("http-proxy");
const chalk = require("chalk");
const path = require('path');
const url = require('url');

const name = 'local';
const hostname = 'localhost';
const target = 9001;
const key = path.join(__dirname, './localhost.key');
const cert = path.join(__dirname, './localhost.cert');
const source = 9005;

proxy.createServer({
	xfwd: true,
	ws: true,
	target: {
		host: hostname,
		port: target
	},
	ssl: {
		key: fs.readFileSync(key, "utf8"),
		cert: fs.readFileSync(cert, "utf8")
	}
}).on("error", function(e) {
	console.error(chalk.red("Request failed to " + name + ": " + chalk.bold(e.code)));
}).on('proxyRes', (proxyRes, req, res) => {
	if (req.headers.origin) {
		const originHostName = url.parse(req.headers.origin).hostname;
		res.setHeader('access-control-allow-origin', req.headers.origin);
		res.setHeader('access-control-allow-credentials', 'true');
	}

	if (req.headers['access-control-request-method']) {
		res.setHeader('access-control-allow-methods', req.headers['access-control-request-method']);
	}

	if (req.headers['access-control-request-headers']) {
		res.setHeader('access-control-allow-headers', req.headers['access-control-request-headers']);
	}

	res.setHeader('access-control-max-age', 60 * 60 * 24 * 30);
	if (req.method === 'OPTIONS') {
		res.send(200);
		res.end();
	}
})
.listen(source);

console.log(chalk.green("Started " + chalk.bold(name) + ": https://" + hostname + ":" + source, "→ http://" + hostname + ":" + target));