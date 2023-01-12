import React from 'react';
import ThreeEntryPoint from '../threeobjects/threeentrypoint';

export default class Threecontainer extends React.Component {
    componentDidMount() {
        ThreeEntryPoint(this.threeEntryPoint);
    }
    render() {
        return <div id="threecontainer" ref={(domelement) => (this.threeEntryPoint = domelement)}></div>;
    }
}
