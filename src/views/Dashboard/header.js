const messages = {
	create: 'Create',
	pageName: `/ ${String.fromCharCode(160)}${String.fromCharCode(160)}Packages`,
	parentPageName: 'WM Internal',
};

export default {
	uuid: 'page-header',
	type: 'WMToolbar',
	props: {
		// style: styles.pageheader,
	},
	children: [
		{
			uuid: 'page-header__header',
			type: 'div',
			props: {
				// style: styles.container,
			},
			children: [
				{
					uuid: 'page-header__breadcrumbs',
					type: 'WMBreadcrumbs',
					props: {
						route: [
							{ label: messages.parentPageName, uuid: 'breadcrumb-0' },
							{ label: messages.pageName, uuid: 'breadcrumb-1' },
						],
						addButtonLabel: messages.create,
					},
					actions: {
						addButtonFunc: [{
							path: ['FOO', 'bar'],
							payload: 'Ayno',
						}],
					},
				},
			],
		},
	],
};