import { commonStyles } from '@workmarket/front-end-components';

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
}, {
	path: ['Packages', 'CREATE', 'packageName'],
	payload: '',
}, {
	path: ['Packages', 'CREATE', 'packageNameIsValid'],
	payload: false,
}, {
	path: ['Packages', 'CREATE', 'internalNotes'],
	payload: '',
}, {
	path: ['Packages', 'CREATE', 'selectedCompanies'],
	payload: [],
}, {
	path: ['Packages', 'CREATE', 'selectedFeatures'],
	payload: [],
}];

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
				children: ['___state', ['Packages', 'CREATE', 'packageName']],
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