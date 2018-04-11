import header from './header/';
import {
	create as createModal,
	activate as activateModal
} from './modal';

import { formatString } from '../../utils/sharedFunctions';

export default {
	type: 'WMGeneric',
	uuid: 'dashboard',
	constants: {
		lib: {
			formatString,
		}
	},
	children: [
		header,
		createModal,
		activateModal,
	]
};