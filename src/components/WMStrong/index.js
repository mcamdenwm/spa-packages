import React, { PureComponent } from 'react';

export default class WMStrong extends PureComponent {
	render = () => (<strong>{this.props.children}</strong>)
}