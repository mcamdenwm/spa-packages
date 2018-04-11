// Patch http parser for fun, $$
process.binding('http_parser').HTTPParser = require('http-parser-js').HTTPParser;

const fs = require("fs");
const proxy = require("http-proxy");
const chalk = require("chalk");
const path = require('path');
const url = require('url');

const name = 'local';
const hostname = 'localhost';
const target = 8888;
const key = path.join(__dirname, './localhost.key');
const cert = path.join(__dirname, './localhost.cert');
const source = 7777;

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
	console.error(chalk.red("Request failed to " + name + ": " + chalk.bold(e.code, e.message)), e.stack);
})
.listen(source);

console.log(chalk.green("Started " + chalk.bold(name) + ": https://" + hostname + ":" + source, "→ http://" + hostname + ":" + target));