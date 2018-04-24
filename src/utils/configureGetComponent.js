import getComponent from '@workmarket/ui-generation';
import WMGeneric from '@workmarket/ui-generation/dist-es/WMGeneric';
import Swagger from 'swagger-client';
import * as Components from '@workmarket/front-end-components';
import { goodJobClient } from '@workmarket/projekt_good_job';
// import sharedFunctions from './sharedFunctions';
import store from '../store';
import { authCb } from '../../goodjob';
import WMCheckboxGroup from '../components/WMCheckboxGroup';
import WMStrong from '../components/WMStrong';

// Store the local configuration so we don't hit the API again
let configuredGetComponent;

const getComponentConfigurator = async () => {
	if (!configuredGetComponent) {
		// Accept specified API via env, with the current host as a default
		const API_HOST = process.env.BASE_API_URL || `${window.location.protocol}//${window.location.host}`;
		const GOOD_JOB_HOST = process.env.BASE_API_URL.replace(/http(s)?:\/\//, '') || window.location.host;
		const API_URL = `${API_HOST}/api-docs/latest`;
		let configuredSwagger;

		if (process.env.NODE_ENV === 'development') {
			// configuredSwagger = await Swagger(`${API_HOST}/swagger.json`, {});
			configuredSwagger = await goodJobClient({
				docsPath: '/api-docs/latest',
				// docsPath: '/swagger.json',
				authCb,
				// authCb,: () => {
				// 	// debugger;
				// 	console.log('AUth cb from client');
				// },
				quiet: true,
				timeout: 3000,
				badJob: false,
				hostname: GOOD_JOB_HOST,
				scheme: 'https',
				clientTimeout: 10000,
				// unsafe: true,
			});
		} else {
			configuredSwagger = await Swagger(API_URL, {});
		}

		configuredGetComponent = getComponent({
			UI: true,
			swaggerClient: configuredSwagger,
			// functions: sharedFunctions,
			// store,
			components: {
				...Components,
				WMGeneric,
				WMCheckboxGroup,
				WMStrong,
			},
		});

		return configuredGetComponent;
	}

	return configuredGetComponent;
};

export default getComponentConfigurator;
