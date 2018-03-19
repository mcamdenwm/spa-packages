import React from 'react';
import { Provider } from 'react-redux';
import { Chrome } from '@workmarket/koopa';

import store from '../../store';

import configureGetComponent from '../../utils/configureGetComponent';
import homeConfig from '../Home';

export default (async () => {
	const configuredGetComponent = await (configureGetComponent());

	return (
		<Provider store={ store }>
			<Chrome>
				{ configuredGetComponent(homeConfig) }
			</Chrome>
		</Provider>
	);
});
