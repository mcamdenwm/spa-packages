import React from 'react';
import { Provider } from 'react-redux';
import Shell from './shell';
import store from '../../store';
import configureGetComponent from '../../utils/configureGetComponent';
import dashboardView from '../../views/Dashboard';

export default (async () => {
	const configuredGetComponent = await (configureGetComponent());

	return (
		<Provider store={ store }>
			<Shell>
				{ configuredGetComponent(dashboardView) }
			</Shell>
		</Provider>
	);
});
