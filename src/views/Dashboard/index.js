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
	]
};