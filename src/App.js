import './App.css';
import Timer from "./Timer";
import Settings from "./Settings";
import Game from "./Game";
import Music from "./Music";
import landingScreen from "./landingScreen";
import {useState} from "react";
import SettingsContext from "./SettingsContext";

function App() {

  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(0.5);
  const [breakMinutes, setBreakMinutes] = useState(0.5);

  return (
    <main>
      <div>
        <h1>FocusMode</h1>
      </div>
      <landingScreen />
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
      <img className='dino-img' src={require('./img/dino.gif')}/>
      {/* <Game/> */}
      <Music/>
    </main>
  );
}


export default App;