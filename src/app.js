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
            <Threecontainer />
        </>
    );
}

export default App;
