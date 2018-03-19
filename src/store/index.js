import {
	generateStore,
	generateState,
} from '@workmarket/ui-generation';

export const storeConfig = {
	FOO: {
		initialState: {
			data: {
				bar: 'baz',
			},
		},
		handlers: [
			'FOO__DO_THING',
		],
	},
};

const store = generateStore({
	reducers: generateState(storeConfig),
});

export default store;
