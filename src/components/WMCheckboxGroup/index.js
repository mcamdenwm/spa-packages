import React, { Component } from 'react';
import { WMCheckbox, commonStyles } from '@workmarket/front-end-components';

const {
	orange,
	grey,
} = commonStyles.colors.baseColors;

const labelStyle = {
	fontSize: 12,
	fontWeight: 100,
	marginBottom: 5,
	display: 'inline-block',
};

export default class WMCheckboxGroup extends Component {
	render() {
		return (
			<div>
				<label style={labelStyle}>{this.props.label} { this.props.required ? (<span style={{color: orange}}>*</span>) : null }</label>
				{this.props.features.map(feature => 
					<WMCheckbox
						key={feature.id}
						onCheck={(e, isChecked) => { this.props.onCheck(feature, isChecked); }}
						label={feature.name}
						id={`feature-${feature.id}`}
						labelStyle={{
							color: grey,
							fontWeight: 100,
						}}
						style={{
							marginBottom: 20,
						}}
						checked={this.props.selectedFeatures[feature.id]}
					/>
				)}
			</div>
		);
	}
}
