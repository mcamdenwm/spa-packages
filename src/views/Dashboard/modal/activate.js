import { commonStyles } from '@workmarket/front-end-components';

const {
	green,
} = commonStyles.colors.baseColors;

const messages = {
	created: ' package has been created.',
	activateNow: 'Would you like to activate it now?',
};

export default {
	type: 'WMConfigurableModal',
	uuid: 'activateModal',
	props: {
		primaryLabel: 'Activate Now',
		secondaryLabel: 'Activate Later',
		title: '',
		modal: true,
	},
	selectors: {
		open: ['___state', ['Packages', 'ACTIVATE', 'open']]
	},
	actions: {
		onClose: {
			path: ['Packages', 'ACTIVATE', 'open'],
			payload: false,
		},
		onSecondary: {
			path: ['Packages', 'ACTIVATE', 'open'],
			payload: false,
		}
	},
	children: [{
		type: 'WMGeneric',
		props: {
			style: {
				marginBottom: 30,
				textAlign: 'center',
				transform: 'scale(4)',
			},
		},
		children: [{
			type: 'WMFontIcon',
			props: {
				className: 'material-icons',
				color: green,
			},
			children: ['check'],
		}],
	}, {
		type: 'div',
		props: {
			style: {
				textAlign: 'center',
			}
		},
		children: [{
			type: 'div',
			children: [{
				type: 'strong',
				children: ['Pay Only'],
			}, {
				type: 'span',
				children: [messages.created]
			}],
		}, {
			type: 'div',
			children: [messages.activateNow],
		}],
	}],
};