import React from 'react';

// import Clock from "./components/clock";
import Loop from './components/loop';
import Name from './components/name';
import Threecontainer from './components/threecontainer';
import globalstateobj from './globalstate';

function App() {
    return (
        <>
            <audio className="audio">
                <source src={require('./resources/music/music1.mp3')} />
            </audio>
            <audio className="audio">
                <source src={require('./resources/music/music0.wav')} />
            </audio>
            <Name />
            <img
                id="scrolldown"
                onMouseDown={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                onMouseLeave={() => (globalstateobj.mouseToRedFromHtml = false)}
                onMouseOver={() => {
                    globalstateobj.mouseToRedFromHtml = true;
                    globalstateobj.mouseToRed = true;
                }}
                src={require('./resources/images/scrolldown.png')}
                alt="Scroll Down"
            />
            <Loop />
            <div
                style={{ position: 'fixed', right: '1%', bottom: 0, justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '0.3vw' }}
                onMouseLeave={() => (globalstateobj.mouseToRedFromHtml = false)}
                onMouseOver={() => {
                    globalstateobj.mouseToRedFromHtml = true;
                    globalstateobj.mouseToRed = true;
                }}
            >
                <a href="https://github.com/Leo310" target="_">
                    <img src={require('./resources/images/github.png')} style={{ width: '3vw' }} alt="GitHub" />
                </a>
                <a href="https://www.linkedin.com/in/leonard-heininger-4559431b7/" target="_">
                    <img src={require('./resources/images/linkedin.png')} style={{ width: '3vw' }} alt="LinkedIn" />
                </a>
                <a href="https://www.polywork.com/lhs_polywork" target="_" style={{ marginLeft: '7px', marginRight: '7px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2vw" height="2vw" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                        <path
                            fill="#8be9fd"
                            d="M19.125 0H4.875A4.865 4.865 0 0 0 0 4.875v14.25C0 21.825 2.175 24 4.875 24h6.6c2.7 0 4.875-2.175 4.875-4.875V16.65h2.775c2.7 0 4.875-2.175 4.875-4.875v-6.9C24 2.175 21.825 0 19.125 0zM16.5 1.275h2.625a3.6 3.6 0 0 1 3.6 3.6v2.7H16.5v-6.3zM15.075 9v6.45H8.85V9h6.225zM8.85 1.2h6.225v6.375H8.85V1.2zM1.275 4.8a3.6 3.6 0 0 1 3.6-3.6H7.5v6.375H1.275V4.8zM7.5 9v6.45H1.2V9h6.3zm0 13.725H4.8a3.6 3.6 0 0 1-3.6-3.6V16.8h6.3v5.925zm7.575-3.525a3.6 3.6 0 0 1-3.6 3.6H8.85v-5.925h6.225V19.2zm7.65-7.35a3.6 3.6 0 0 1-3.6 3.6H16.5V9h6.225v2.85z"
                        />
                    </svg>
                </a>
                <a href="mailto:leodev310@gmail.com">
                    <img src={require('./resources/images/gmail.png')} style={{ width: '3vw' }} alt="LinkedIn" />
                </a>
            </div>
            <Threecontainer />
        </>
    );
}

export default App;
