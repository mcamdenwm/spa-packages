const messages = {
	create: 'Create',
	pageName: 'Packages',
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
							{ label: messages.parentPageName, url: '#', uuid: 'breadcrumb-0' },
							{ label: messages.pageName, uuid: 'breadcrumb-1' },
						],
						addButtonLabel: messages.create,
					},
					actions: [
						{
							propName: 'addButtonFunc',
							sequence: [
								{
									type: 'PERMISSIONS__ROLE__RESET',
									path: ['Permissions', 'ROLE', 'role'],
									data: {
										name: '',
										permissionUuids: [],
									},
								},
								{
									type: 'PERMISSIONS__CREATE__OPEN',
									path: ['Permissions', 'CREATE', 'dialog', 'open'],
									data: true,
								},
							],
						},
					],
				},
			],
		},
	],
};