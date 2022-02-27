import './App.css';
import Timer from "./Timer";
import Settings from "./Settings";
import Music from "./Music";
import {useState} from "react";
import SettingsContext from "./SettingsContext";
import ModeAnimated from './images/mode-animated.gif';
import ModeStatic from './images/mode.png';

function App() {

  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(0.5);
  const [breakMinutes, setBreakMinutes] = useState(0.5);

  return (
    <main>
      <header>
        <h1>FocusMode</h1>
      </header>
      <div className="timer">
        <SettingsContext.Provider value={{
          showSettings,
          setShowSettings,
          workMinutes,
          breakMinutes,
          setWorkMinutes,
          setBreakMinutes,
        }}>
          {/* {showSettings ? <Settings /> : <Timer />} */}
          {showSettings ? <Settings /> : <Timer />}
        </SettingsContext.Provider>
      </div>
      <img className='dino-img upper' src={require('./img/motivational.gif')}/>
      {/* <img className='dino-img' src={require('./img/dino.gif')}/> */}
      <picture>
        <source srcSet={ModeStatic} media="(prefers-reduced-motion: reduce)"></source> 
        <img className="modeAnimated" srcSet={ModeAnimated} alt="Animated character"/>
      </picture>
      <Music/>
    </main>
  );
}


export default App;