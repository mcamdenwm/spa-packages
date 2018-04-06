import header from './header/';
import {
	create as createModal,
	activate as activateModal
} from './modal';

export default {
	type: 'WMGeneric',
	uuid: 'dashboard',
	constants: {},
	children: [
		header,
		createModal,
		activateModal,
		{
			type: 'WMFlatButton',
			props: {
				label: 'Click',
			},
			actions: {
				onClick: {
					path: ['swagger'],
					meta: {
						swagger: {
							operationId: 'getCompany',
							onSuccess: {
								path: ['swagger', 'success'],
							},
							onError: {
								path: ['swagger', 'error'],
							},
						},
					},
				},
			},
		},
	]
};