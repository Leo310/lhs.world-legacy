import React from 'react';

import globalstateobj from '../globalstate';

import WordcloudForm from './wordcloudform';
import ScrumbleHeader from './scrumbleheader';

class Loop extends React.Component {
    state = { borderAnimation: '', scrollAnimationUp: false, scrollAnimationDown: false };
    constructor(props) {
        super(props);
        this.lastScroll = 0;
        this.scrollTimer = null;
        this.onscroll = true;
        this.onfirstscroll = true;
        this.notfirstreloadscroll = false;
        this.scrollanimationfinished = true;

        this.loopContentIndex = 0;
        this.lastScrumbleheaderIndex = 0;
        this.lastArrowPressedTime = 0;
        this.scrolling = null;
        this.mouseDown = false;
        this.scrumbleheaderrefs = [];
    }
    componentDidMount() {
        this.loopcontents = document.getElementsByClassName('loopcontent');
        for (let i = 0; i < this.loopcontents.length - 1; i++) this.scrumbleheaderrefs.push(React.createRef());
        this.loopcontentheight = this.loopcontents[0].clientHeight;
        this.clones = document.getElementsByClassName('isclone');
        this.clonesHeight = this.loopcontentheight * this.clones.length;

        this.isVisible = this.isVisible.bind(this);
        this.loop = document.getElementById('loop');
        // if scrolled in loopcontent, dont want to trigger wheel event in body.
        // thats why second listener on wheel which stops propagation and set to true
        this.loop.addEventListener('scroll', () => this.onScroll(), { passive: true, capture: true });
        this.loop.addEventListener('wheel', (e) => e.stopPropagation(), { passive: true, capture: true });
        this.loop.scrollTop = 1; // to allow upwards scrolling
        this.scrollHeight = this.loop.scrollHeight;
        // console.log(this.scrollHeight);
        this.disableScrollCheck = false;

        window.addEventListener('scroll', this.isVisible);
    }

    isVisible() {
        if (window.pageYOffset + window.innerHeight >= this.loop.offsetTop) {
            window.removeEventListener('scroll', this.isVisible);
            this.scrumbleheaderrefs[0].current.doScrumbleHeader();
        }
    }

    onScroll() {
        this.scrollCheck();
        this.loopContentIndex = Math.floor(this.loop.scrollTop / this.loopcontentheight);
        this.loopScrumbleHeaderIndex = Math.floor((this.loop.scrollTop + this.loopcontentheight / 2) / this.loopcontentheight);
        if (this.loopScrumbleHeaderIndex !== this.lastScrumbleheaderIndex && this.loopScrumbleHeaderIndex !== this.loopcontents.length - 1) {
            this.scrumbleheaderrefs[this.loopScrumbleHeaderIndex].current.doScrumbleHeader();
            this.lastScrumbleheaderIndex = this.loopScrumbleHeaderIndex;
        }
        // console.log("Scrolltop: " + this.loop.scrollTop);
        console.log('ContIndex: ' + this.loopContentIndex);

        // scroll gets executed on page load somewhy
        if (this.onscroll && this.notfirstreloadscroll) {
            this.setState({ borderAnimation: 'on' });
            this.onscroll = false;
        }

        if (this.scrollTimer !== null) {
            clearTimeout(this.scrollTimer);
        }
        this.scrollTimer = setTimeout(() => {
            this.onscroll = true;
            this.setState({ borderAnimation: 'off' });
        }, 100);
        this.notfirstreloadscroll = true;
    }
    scrollCheck() {
        let scrollTop = this.loop.scrollTop;
        globalstateobj.scrollPositionLoop += scrollTop - this.lastScroll;

        this.lastScroll = scrollTop;

        if (scrollTop + this.clonesHeight >= this.scrollHeight) {
            // console.log("Jump Scroll TOP: " + scrollTop);
            // set to 1 to avoid looping
            this.loop.scrollTop = 1;
            this.lastScroll = 0;
            this.disableScrollCheck = true;
        } else if (scrollTop <= 0) {
            // console.log("Jump Scroll Bottom");
            // subtract in one here to not directly jump to the top again
            this.loop.scrollTop = this.scrollHeight - this.clonesHeight - 1;
            this.lastScroll = this.scrollHeight - this.clonesHeight;
            this.disableScrollCheck = true;
        }
    }

    scrollToNextDiv(dir) {
        let now = new Date().getTime();
        if (now - this.lastArrowPressedTime > 500 || this.needDoubleScroll) {
            this.needDoubleScroll = false;
            let contratio = this.loop.scrollTop / this.loopcontentheight - this.loopContentIndex;
            if ((now - this.arrowPressedTime < 300 || contratio > 0.3) && (dir > 0 || Math.round(this.loop.scrollTop - 1) % this.loopcontentheight === 0)) {
                this.loopContentIndex += dir;
            } else if (now - this.arrowPressedTime > 300 && contratio > 0.7) {
                this.loopContentIndex++;
            }

            // Checking for out of bounds index:
            if (this.loopContentIndex > this.loopcontents.length - 1) {
                this.loop.scrollTo(0, 1);
                // need this double scroll because we cant scroll twice in one function call
                setTimeout(() => this.scrollToNextDiv(1), 0);
                this.needDoubleScroll = true;
            } else if (this.loopContentIndex < 0) {
                this.loop.scrollBy(0, -1);
                setTimeout(() => this.scrollToNextDiv(-1), 0);
                this.needDoubleScroll = true;
            } else {
                // plus one because its offset of every content
                this.loop.scrollTo({ top: this.loopcontents[this.loopContentIndex].offsetTop + 1, behavior: 'smooth' });
            }
            this.lastArrowPressedTime = now;
        }
    }

    onScrollArrowPressed(arrow) {
        this.arrowPressedTime = new Date().getTime();
        document.getElementById('uparrow').style.visibility = 'visible';
        // delay to remove stuttering
        this.autoScrollDelay = setTimeout(() => {
            this.autoScrollInterval = window.setInterval(() => {
                this.loop.scrollBy(0, 5 * arrow);
            }, 0);
        }, 100);
        this.mouseDown = true;
    }
    onScrollArrowReleased(arrow) {
        if (this.mouseDown) {
            clearTimeout(this.autoScrollDelay);
            clearInterval(this.autoScrollInterval);
            this.scrollToNextDiv(arrow);
            this.mouseDown = false;
        }
    }

    render() {
        return (
            <>
                <div id="loopcontrolls">
                    <img
                        id="uparrow"
                        onMouseDown={() => this.onScrollArrowPressed(-1)}
                        onMouseLeave={() => {
                            this.onScrollArrowReleased(-1);
                            globalstateobj.mouseToRedFromHtml = false;
                        }}
                        onMouseUp={() => this.onScrollArrowReleased(-1)}
                        onMouseOver={() => {
                            globalstateobj.mouseToRedFromHtml = true;
                            globalstateobj.mouseToRed = true;
                        }}
                        src={require('../resources/images/uparrow.png')}
                        alt="Up"
                    />
                    <img id="circlearrow" src={require('../resources/images/circle.png')} alt="" />
                    <img
                        id="downarrow"
                        onMouseDown={() => {
                            this.onScrollArrowPressed(1);
                        }}
                        onMouseLeave={() => {
                            this.onScrollArrowReleased(1);
                            globalstateobj.mouseToRedFromHtml = false;
                        }}
                        onMouseUp={() => this.onScrollArrowReleased(1)}
                        onMouseOver={() => {
                            globalstateobj.mouseToRedFromHtml = true;
                            globalstateobj.mouseToRed = true;
                        }}
                        src={require('../resources/images/downarrow.png')}
                        alt="Down"
                    />
                </div>
                <div
                    id="loop"
                    onMouseLeave={() => (globalstateobj.mouseToRedFromHtml = false)}
                    onMouseOver={() => {
                        globalstateobj.mouseToRedFromHtml = true;
                        globalstateobj.mouseToRed = true;
                    }}
                    className={`${this.state.borderAnimation === 'on' ? 'animate-on' : 'animate-off'}`}
                >
                    <div style={{ height: '3600px' }}>
                        <div className="loopcontent">
                            <br />
                            <br />
                            <ScrumbleHeader ref={this.scrumbleheaderrefs[0]} breakAt={14} onlyOnce={true} firstWord="Welcome to my World" />
                        </div>
                        <div className="loopcontent">
                            <br />
                            <br />
                            <ScrumbleHeader ref={this.scrumbleheaderrefs[1]} onlyOnce={true} firstWord="Chill Vibes" />
                            <p>To enjoy the ride you can listen to some chill spacey music.</p>
                        </div>
                        <div className="loopcontent">
                            <br />
                            <br />
                            <ScrumbleHeader ref={this.scrumbleheaderrefs[2]} onlyOnce={true} firstWord="My Workspace" />
                            <p>If you don't have great sound, nice lights and a crazy PC, get it, NOW!</p>
                        </div>
                        <div className="loopcontent">
                            <br />
                            <br />
                            <ScrumbleHeader ref={this.scrumbleheaderrefs[3]} onlyOnce={true} breakAt={11} firstWord="My Skills and Interests" />
                            <br />
                            <div style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '0.5vw' }}>
                                <img src={require('../resources/images/github.png')} style={{ width: '2vw' }} alt="Github:" />
                                <a href="https://github.com/Leo310" target="_">
                                    GitHub/Leo310
                                </a>
                            </div>
                        </div>
                        <div className="loopcontent">
                            <br />
                            <br />
                            <ScrumbleHeader ref={this.scrumbleheaderrefs[4]} onlyOnce={true} firstWord="Ty &lt;3" />
                            <WordcloudForm />
                            <br />
                            <p>Contact:</p>
                            <a href="mailto:leodev310@gmail.com">Mail</a>
                        </div>
                    </div>
                    <div className="isclone loopcontent">
                        <br />
                        <br />
                        <h1>Welcome to my</h1>
                        <h1>World</h1>
                    </div>
                </div>
            </>
        );
    }
}

export default Loop;
