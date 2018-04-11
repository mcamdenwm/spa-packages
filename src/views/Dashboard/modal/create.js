import React from 'react';
import { WMCheckbox, commonStyles } from '@workmarket/front-end-components';

const {
	orange,
} = commonStyles.colors.baseColors;

const labelStyle = {
	fontSize: 12,
	fontWeight: 100,
	marginBottom: 5,
	display: 'inline-block',
};

export default {
	type: 'WMConfigurableModal',
	uuid: 'createModal',
	props: {
		primaryLabel: 'Create',
		secondaryLabel: 'Cancel',
		title: 'Create Package',
	},
	selectors: {
		primaryDisabled: ['___not',
			['___and', 
				['___state', ['Packages', 'CREATE', 'packageNameIsValid']],
				['___gt',
					['___compose',
						['___length'],
						['___filter', ['___identity']],
						['___values'],
						['___invoke', ['___state', ['Packages', 'CREATE', 'selectedFeatures'], {}]]
					],
					0
				]
			]
		],
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
		actions: {
			didMount: [{
				path: ['Packages', 'CREATE', 'companies', 'success', 'body'],
				payload: [{
					name: 'AAA',
					uuid: '1'
				}, {
					name: 'BBB',
					uuid: '2',
				}],
				// meta: {
				// 	swagger: {
				// 		// @todo replace with actual op
				// 		operationId: 'getCompanies',
				// 		onSuccess: {
				// 			path: ['Packages', 'CREATE', 'companies', 'success'],
				// 		},
				// 		onError: {
				// 			path: ['Packages', 'CREATE', 'companies', 'error'],
				// 		},
				// 	},
				// },
			}, {
				path: ['Packages', 'CREATE', 'features'],
				payload: {
					request: {},
				},
				meta: {
					swagger: {
						operationId: 'wm_feature_list',
						onSuccess: {
							path: ['Packages', 'CREATE', 'features', 'success'],
						},
						onError: {
							path: ['Packages', 'CREATE', 'features', 'error'],
						},
					},					
				}
			}]
		},
		children: [{
			type: 'WMValidatingTextField',
			props: {
				name: 'packageName',
				required: true,
				floatingLabelText: 'Package Name',
				hintText: 'Enter Name',
				floatingLabelFixed: true,
				errorName: 'Please enter a valid Package Name',
				min: 1,
				max: 50,
				style: {
					width: '100%',
				}
			},
			selectors: {
				value: ['___state', ['Packages', 'CREATE', 'packageName']],
				valid: ['___state', ['Packages', 'CREATE', 'packageNameIsValid']],
			},
			actions: {
				onValidate: {
					path: ['Packages', 'CREATE', 'packageNameIsValid'],
					payload: ['___arg', 0, 'isValid'],
				},
				onChange: {
					path: ['Packages', 'CREATE', 'packageName'],
					payload: ['___arg', 1],
				}
			}
		}, {
			type: 'WMTextField',
			props: {
				name: 'internalNotes',
				floatingLabelText: 'Internal Notes',
				hintText: 'Please enter internal notes...',
				floatingLabelFixed: true,
				style: {
					width: '100%',
				}
			},
			selectors: {
				value: ['___state', ['Packages', 'CREATE', 'internalNotes'], ''],
			},
			actions: {
				onChange: {
					path: ['Packages', 'CREATE', 'internalNotes'],
					payload: ['___arg', 1],
				}
			}
		}, {
			type: 'WMGeneric',
			children: [{
				type: 'label',
				props: {
					style: labelStyle,
				},
				children: 'Assign Companies',
			}]
		}, {
			type: 'WMAutocompleteChips',
			props: {
				name: 'company',
				// Note this isn't working properly, need to pass floatingLabelText to WMAutocomplete
				// @todo ^^
				floatingLabelText: 'Assign Companies',
				hintText: 'Enter and/or select company or companies...',
				floatingLabelFixed: true,
				chipLabelKey: 'name',
				chipdIdKey: 'uuid',
				chipMetaKey: 'uuid',
				dataSourceConfig: {
					text: 'name',
					value: 'uuid',
				},
				style: {
					width: '100%',
				}
			},
			selectors: {
				chips: ['___state', ['Packages', 'CREATE', 'selectedCompanies'], []],
				dataSource: ['___filter',
					['___call',
						['___flip',
							['___compose', 
								['___not'],
								['___contains'],
							],
						],
						['___state', ['Packages', 'CREATE', 'selectedCompanies'], []]
					],
					['___state', ['Packages', 'CREATE', 'companies', 'success', 'body'], []],
				],
			},
			actions: {
				onAddChip: {
					path: ['Packages', 'CREATE', 'selectedCompanies'],
					payload: ['___concat', ['___state', ['Packages', 'CREATE', 'selectedCompanies'], []], [['___arg', 0]]],
				},
				onRemoveChip: [{
					path: ['Packages', 'CREATE', 'selectedCompanies'],
					payload: ['___filter', 
						['___call', ['___propEq', 'uuid', ['___arg', 0]]],
						['___state', ['Packages', 'CREATE', 'selectedCompanies'], []
					]],
				}],
			}
		}, {
			type: 'WMGeneric',
			props: {
				style: {
					marginTop: 10,
				}
			},
			children: [{
				type: 'WMCheckboxGroup',
				props: {
					label: 'Select Features',
					required: true,
				},
				selectors: {
					features: ['___state', ['Packages', 'CREATE', 'features', 'success', 'body', 'result', 'payload'], []],
					selectedFeatures: ['___state', ['Packages', 'CREATE', 'selectedFeatures'], {}],
				},
				actions: {
					onCheck: {
						path: ['Packages', 'CREATE', 'selectedFeatures'],
						payload: ['___merge', ['___state', ['Packages', 'CREATE', 'selectedFeatures'], {}], ['___objOf', ['___arg', 0, 'uuid'], ['___arg', 1]]],
					}
				}
			}]
		}],
	}]
};