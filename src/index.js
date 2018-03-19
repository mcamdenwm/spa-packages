import 'isomorphic-fetch';
import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import StatefulShell from './components/StatefulShell';

injectTapEventPlugin();

const render = (Component) => {
	ReactDOM.render(
		<AppContainer>
			{ Component }
		</AppContainer>,
		document.getElementById('app'),
	);
};

StatefulShell().then(render);

if (module.hot) {
	module.hot.accept('./components/StatefulShell', () => { StatefulShell().then(render); });
}
