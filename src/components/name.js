import React from 'react';

import globalstateobj from '../globalstate';
import ScrumbleHeader from './scrumbleheader';

class Name extends React.Component {
    state = {
        active: '',
    };
    constructor(props) {
        super(props);

        this.scrollImageAppear = false;
        this.scrumbleheader = React.createRef();
    }

    componentDidMount() {
        this.scrumbleheader.current.doScrumbleHeader();
    }

    render() {
        return (
            <div id="nameWrapper" onClick={() => this.scrumbleheader.current.doScrumbleHeader()} className={`${this.state.active === 'on' ? 'animate-on' : 'animate-off'}`}>
                <ScrumbleHeader
                    ref={this.scrumbleheader}
                    oncallback={() => this.setState({ active: 'on' })}
                    offcallback={() => {
                        this.setState({ active: 'o' });
                        if (!this.scrollImageAppear) this.scrollImageAppear = true;
                        else document.getElementById('scrolldown').style.visibility = 'visible';
                    }}
                    onMouseLeave={() => (globalstateobj.mouseToRedFromHtml = false)}
                    onMouseOver={() => {
                        globalstateobj.mouseToRedFromHtml = true;
                        globalstateobj.mouseToRed = true;
                    }}
                    firstWord="Hi, I am... "
                    secondWord="Leonard Heininger"
                />
            </div>
        );
    }
}
export default Name;
