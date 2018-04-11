const generateWebpackConfig = require('@workmarket/hunk').generateWebpackConfig;
const path = require('path');

const paths = {
	app: path.join(__dirname, './src'),
	playground: path.join(__dirname, './src'),
	build: path.join(__dirname, './build'),
};
const devConfig = {
	devServer: {
		enabled: true,
		port: '4004',
	},
	generateHtml: {
		enabled: true,
		title: 'Packages',
	},
	generateSourceMaps: {
		enabled: true,
		type: 'cheap-module-inline-source-map',
	},
	loadImages: {
		enabled: true,
		include: [
			/images/g,
		],
		// Required by API schema rules
		exclude: [],
	},
	environmentVariables: {
		enabled: true,
		variables: {
			'process.env.NODE_ENV': 'development',
			'process.env.BABEL_ENV': 'development',
			'process.env.BASE_API_URL': process.env.BASE_API_URL || 'https://api-gtw.dev.workmarket.com',
		},
	},
};

const buildConfig = {
	generateHtml: {
		enabled: false,
		title: 'WM Packages',
	},
	loadImages: {
		enabled: true,
		include: [
			/images/g,
		],
		// Required by API schema rules
		exclude: [],
	},
	environmentVariables: {
		enabled: true,
		variables: {
			'process.env.NODE_ENV': 'production',
			'process.env.BABEL_ENV': 'build',
		},
	},
	clean: {
		enabled: false,
		path: paths.build,
	},
	serviceWorker: {
		enabled: false,
	},
	compressOutput: {
		enabled: false,
	},
	minifyJavascript: {
		enabled: false,
	},
};

const generatedConfig = generateWebpackConfig({
	env: process.env.NODE_ENV,
	paths,
	partsConfig: process.env.NODE_ENV !== 'development' ? buildConfig : devConfig,
});

generatedConfig.output.filename = '[name]-[hash].js';

// Configure the webpack dev server to work with gateway requests
if (process.env.NODE_ENV === 'development') {
	// Universally bind to current ip
	generatedConfig.devServer.host = '0.0.0.0';
	// Since we're binding to a local ip, in dev mode, ignore security checks for the host
	generatedConfig.devServer.disableHostCheck = true;
}

module.exports = generatedConfig;
