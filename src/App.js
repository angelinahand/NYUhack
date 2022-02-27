import './App.css';
import Timer from "./Timer";
import Settings from "./Settings";
import landingScreen from "./landingScreen";
import {useState} from "react";
import SettingsContext from "./SettingsContext";
import TimerPage from './timerpage';

function App() {

  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    <main>
      <landingScreen />
      <SettingsContext.Provider value={{
        showSettings,
        setShowSettings,
        workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
      }}>
        {showSettings ? <Settings /> : <TimerPage />}
      </SettingsContext.Provider>
    </main>
  );
}

export default App;