import generateAlertBanner, { successMessages } from '../../partials/generateAlertBanner';

const { successfullyCreatedPackage, successfullyCreatedPackageAndActivated } = successMessages;

const messages = {
	create: 'Create',
	pageName: `/ ${String.fromCharCode(160)}${String.fromCharCode(160)}Packages`,
	parentPageName: 'WM Internal',
};

export default {
	uuid: 'page-header',
	type: 'WMGeneric',
	children: [{
		type: 'WMToolbar',
		uuid: 'page-header__toolbar',
		children: [
			{
				uuid: 'page-header__header',
				type: 'div',
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
								path: ['Packages', 'CREATE', 'open'],
								payload: true,
							}],
						},
					},
				],
			},
		],
	},
	generateAlertBanner(['___call', ['___constant', 'dashboard.lib.formatString'], successfullyCreatedPackage, ['___state', ['Packages', 'CREATE', '_packageName']] ], ['Packages', 'CREATE', 'successfullyCreatedPackage'], null, 'successfullyCreatedPackage-alert', 'success'),
	generateAlertBanner(['___call', ['___constant', 'dashboard.lib.formatString'], successfullyCreatedPackageAndActivated, ['___state', ['Packages', 'CREATE', '_packageName']] ], ['Packages', 'CREATE', 'successfullyCreatedPackageAndActivated'], null, 'successfullyCreatedPackageAndActivated-alert', 'success'),
	]
};