import React from 'react';
import { Provider } from 'react-redux';
import Shell from './shell';
import store from '../../store';
import configureGetComponent from '../../utils/configureGetComponent';
import dashboardView from '../../views/Dashboard';

export default (async () => {
	const configuredGetComponent = await (configureGetComponent());

	dashboardView.constants.getComponent = (config) => {
		console.log('Dynamic config', config);
		return configuredGetComponent(config);
	};

	dashboardView.constants.getChildren = (children) => {
		console.log('Dynamic getChildren', children);
		const rendered = configuredGetComponent({
			type: 'WMGeneric',
			selectors: {
				children: children(),
			},
		});

		console.log('Rendered', rendered);
		return rendered.children;
	};

	return (
		<Provider store={ store }>
			<Shell>
				{ configuredGetComponent(dashboardView) }
			</Shell>
		</Provider>
	);
});
