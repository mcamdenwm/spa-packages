const chalk = require('chalk');
const path = require('path');
const r2 = require('r2');
const {
	USER,
	PASSWORD
} = require('./.credentials');

const API_HOST = process.env.BASE_API_URL || `https://api-gtw.dev.workmarket.com/`;
const TOKEN_HOST = `${API_HOST}/v3/oauth/token?grant_type=password&username=${USER}&password=${PASSWORD}`;
const SCHEME = 'https';

console.log(API_HOST);

const getToken = async (timeoutID) => {
	console.log(chalk.blue('Beginning fetch for Auth Token.'));
	let failure = false;
	const errorMessages = [];
	let internalToken = null;

	try {
		const tokenGrabResponse = await r2.post(TOKEN_HOST, {
			headers: {
				origin: 'https://localhost:6969',
				'accept-encoding': 'gzip, deflate, br',
				accept: '*/*',
				'content-length': 0,
			},
		}).json;

		let payloadLength = null;

		try {
			payloadLength = tokenGrabResponse.result.payload.length;
		} catch (e) {
			console.log(chalk.red('No token returned.'));
		}

		if (!payloadLength) {
			failure = true;
			errorMessages.push(`${tokenGrabResponse.meta.statusCode}: ${tokenGrabResponse.meta.message}`);
			// internalToken = JSON.parse(fs.readFileSync(path.join(__dirname, './', 'good_job/tokens/latest.json')));
		} else {
			console.log(chalk.yellow('Token Grab Response: '));
			console.log(tokenGrabResponse.result);
			internalToken = tokenGrabResponse.result.payload[0].accessToken;
		}
	} catch (e) {
		failure = true;
		errorMessages.push(JSON.stringify(e));
	}

	if (!failure) {
		console.log(chalk.green('Success Grabbing Token!'));
		console.log(chalk.green(`Token: ${internalToken}`));
		clearTimeout(timeoutID);
		return {
			'api-key': `Bearer ${internalToken}`,
		};
	}

	console.log(chalk.yellow('Failure occured while grabbing token.'));
	console.log(chalk.red(errorMessages));
	clearTimeout(timeoutID);
	return {
		'api-key': `Bearer ${internalToken}`,
	};
};

module.exports = {
	host: API_HOST,
	// safety: false,
	// custom: {},
	quiet: true,
	// empty: false,
	timeout: 5000,
	// exact: true,
	// fakeDepth,
	// json,
	noCache: true,
	// status,
	// logging,
	// interactive,
	authentication: true,
	authCb: getToken,
	docPath: '/api-docs/latest',
	randomizePath: ['result', 'properties', 'payload'],
	https: true,
	// below is for you
	customFaker: (object, randomValueGenerated) => { console.log(object); /* return whatever here */ return randomValueGenerated; }
}
