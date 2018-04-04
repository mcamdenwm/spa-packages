export default {
	type: 'WMConfigurableModal',
	props: {
		primaryLabel: 'Create',
		secondaryLabel: 'Cancel',
		title: 'Create Package',
	},
	selectors: {
		open: ['___state', ['Packages', 'CREATE', 'open']],
	},
	actions: {
		onPrimary: [{
			path: ['Packages', 'CREATE', 'open'],
			payload: false,
		}, {
			path: ['Packages', 'ACTIVATE', 'open'],
			payload: true,
		}],
		onClose: {
			path: ['Packages', 'CREATE', 'open'],
			payload: false,
		},
		onSecondary: {
			path: ['Packages', 'CREATE', 'open'],
			payload: false,
		}
	},
	children: [{
		type: 'WMGeneric',
		children: 'Foo',
	}]
};