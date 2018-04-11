import uuidGen from 'uuid/v4';

export const failureMessages = {
};

export const successMessages = {
	successfullyCreatedPackage: '${0} has been created.', // eslint-disable-line no-template-curly-in-string
	successfullyCreatedPackageAndActivated: '${0} has been created and is now active.', // eslint-disable-line no-template-curly-in-string
};

export default function generateAlertBanner (message, path, condition, uuid = uuidGen(), status = 'error', dismissData = null) {
	const banner = {
		type: 'WMMessageBanner',
		uuid,
		props: {
			status,
		},
		selectors: {
			children: message,
		},
		actions: {
			onDismiss: {
				path,
				payload: dismissData,
			}
		}
	};
	
	const alertExistsCondition = ['___not', ['___isNil', ['___state', path]]];

	if (condition) {
		banner.conditional = ['___and', [condition, alertExistsCondition]];
	} else {
		banner.conditional = alertExistsCondition;
	}

	return banner;
}
