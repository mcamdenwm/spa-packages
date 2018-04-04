export default {
	type: 'WMConfigurableModal',
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
		children: 'Foo',
	}]
};