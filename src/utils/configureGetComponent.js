import getComponent from '@workmarket/ui-generation';
import WMGeneric from '@workmarket/ui-generation/dist-es/WMGeneric';
import Swagger from 'swagger-client';
import * as Components from '@workmarket/front-end-components';
import * as Patterns from '@workmarket/front-end-patterns';
import { goodJobClient } from '@workmarket/projekt_good_job';
// import sharedFunctions from './sharedFunctions';
import store from '../store';
import { authCb } from '../../goodjob';

// Store the local configuration so we don't hit the API again
let configuredGetComponent;

const getComponentConfigurator = async () => {
	if (!configuredGetComponent) {
		// Accept specified API via env, with the current host as a default
		const API_HOST = process.env.BASE_API_URL || `${window.location.protocol}//${window.location.host}`;
		const GOOD_JOB_HOST = process.env.BASE_API_URL || window.location.host;
		const API_URL = `${API_HOST}/api-docs/latest`;
		let configuredSwagger;

		if (process.env.NODE_ENV === 'development') {
			configuredSwagger = await goodJobClient({
				docsPath: '/api-docs/latest',
				authCb,
				quiet: true,
				timeout: 3000,
				badJob: false,
				hostname: GOOD_JOB_HOST,
				scheme: 'https',
				clientTimeout: 5000,
				unsafe: false,
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
				...Patterns,
				WMGeneric,
			},
		});

		return configuredGetComponent;
	}

	return configuredGetComponent;
};

export default getComponentConfigurator;
