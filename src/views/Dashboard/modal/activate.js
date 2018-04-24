import { commonStyles } from '@workmarket/front-end-components';
import resetForm from './partials/resetForm';

const {
	green,
} = commonStyles.colors.baseColors;

const messages = {
	created: ' package has been created.',
	activateNow: 'Would you like to activate it now?',
};

const closeSequence = [{
	// temporary until persist
	path: ['Packages', 'CREATE', '_packageName'],
	payload: ['___state', ['Packages', 'CREATE', 'packageName']],
},{
	path: ['Packages', 'ACTIVATE', 'open'],
	payload: false,
},
	...resetForm,
];

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
		onClose: [
		...closeSequence,
		{
			path: ['Packages', 'CREATE', 'successfullyCreatedPackage'],
			payload: true,
		}],
		onSecondary: [
		...closeSequence,
		{
			path: ['Packages', 'CREATE', 'successfullyCreatedPackage'],
			payload: true,
		}],
		onPrimary: [
		...closeSequence,
		{
			path: ['Packages', 'CREATE', 'successfullyCreatedPackageAndActivated'],
			payload: true,
		}]
	},
	children: [{
		type: 'WMGeneric',
		props: {
			style: {
				marginTop: 50,
				marginBottom: 50,
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
				type: 'WMStrong',
				selectors: {
					children: ['___state', ['Packages', 'CREATE', 'new', 'success', 'body', 'result', 'payload', '0', 'name']],
				}
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