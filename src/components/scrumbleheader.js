import React from 'react';

class ScrumbleHeader extends React.Component {
    constructor(props) {
        super(props);
        this.randomstring = '  adegmhilnor$@!.%#?';
        // this.randomstring = "  ⁋efhijlmnorstuvw$%#?";
        this.state = { scrumbledHeader: '' };
        this.clicked = false;
        this.animationTime = 1000;
        this.refreshRate = 60;
        this.doScrumbleHeader = this.doScrumbleHeader.bind(this);
        this.switch = true;
        this.firstHalf = this.props.firstWord.substring(0, this.props.firstWord.length / 2);
        this.secondHalf = this.props.firstWord.substring(this.props.firstWord.length / 2);
        this.reverseheader = this.secondHalf.split('').reverse().join('');
        this.onlyOnce = this.props.onlyOnce;
        this.didOnce = false;
    }
    componentDidMount() {
        if (this.props.onMount) this.doScrumbleHeader();
    }

    doScrumbleHeader() {
        if (this.props.oncallback) this.props.oncallback();
        if (this.onlyOnce === undefined || this.didOnce === false) {
            this.didOnce = true;
            this.time = 0;
            if (this.props.secondWord) {
                if (this.switch) {
                    this.firstHalf = this.props.firstWord.substring(0, this.props.firstWord.length / 2);
                    this.secondHalf = this.props.firstWord.substring(this.props.firstWord.length / 2);
                    this.reverseheader = this.secondHalf.split('').reverse().join('');
                    this.switch = false;
                } else {
                    this.firstHalf = this.props.secondWord.substring(0, this.props.secondWord.length / 2);
                    this.secondHalf = this.props.secondWord.substring(this.props.secondWord.length / 2);
                    this.reverseheader = this.secondHalf.split('').reverse().join('');
                }
            }
            this.alreadyUsedCharSecondHalf = new Map();
            this.alreadyUsedCharFirstHalf = new Map();
            if (!this.clicked) this.timerId = setInterval(() => this.tick(), this.refreshRate);
            this.clicked = true;
        }
    }

    tick() {
        this.time += this.refreshRate;
        let randomFirstHalf = '<';
        for (let i = 0; i < (this.time / this.animationTime) * this.firstHalf.length; i++) {
            if (this.alreadyUsedCharSecondHalf.get(i)) {
                randomFirstHalf += this.alreadyUsedCharSecondHalf.get(i);
            } else {
                let char = this.randomstring[Math.round(Math.random() * (this.randomstring.length - 1))];
                randomFirstHalf += char;
                if (this.firstHalf.includes(char)) {
                    this.alreadyUsedCharSecondHalf.set(this.firstHalf.indexOf(char), char);
                }
            }
        }
        let randomSecondHalf = '';
        for (let i = 0; i < (this.time / this.animationTime) * this.secondHalf.length; i++) {
            if (this.alreadyUsedCharFirstHalf.get(i)) {
                randomSecondHalf += this.alreadyUsedCharFirstHalf.get(i);
            } else {
                let char = this.randomstring[Math.round(Math.random() * (this.randomstring.length - 1))];
                randomSecondHalf += char;
                if (this.reverseheader.includes(char)) {
                    this.alreadyUsedCharFirstHalf.set(this.reverseheader.indexOf(char), char);
                }
            }
        }
        randomSecondHalf = randomSecondHalf.split('').reverse().join('');
        randomFirstHalf += randomSecondHalf + '>';

        this.setState({ scrumbledHeader: randomFirstHalf });
        if (this.time >= this.animationTime) {
            clearInterval(this.timerId);
            if (this.props.offcallback) this.props.offcallback();
            this.setState({ scrumbledHeader: ' ' + this.firstHalf + this.secondHalf + ' ' });
            this.clicked = false;
        }
    }

    render() {
        return (
            <div>
                {this.props.breakAt && this.state.scrumbledHeader && this.state.scrumbledHeader.length >= this.props.breakAt ? (
                    <div>
                        <h1 id="scrumbleHeader">{this.state.scrumbledHeader.substring(0, this.props.breakAt)}</h1>
                        <h1 id="scrumbleHeader">{this.state.scrumbledHeader.substring(this.props.breakAt)}</h1>
                    </div>
                ) : (
                    <h1 id="scrumbleHeader">{this.state.scrumbledHeader}</h1>
                )}
            </div>
        );
    }
}
export default ScrumbleHeader;
