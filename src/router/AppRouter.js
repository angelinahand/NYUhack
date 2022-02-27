import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import TicTacToe from "../tictactoe/TicTacToe";
import RockPaperScissors from "../rockPaperScissors/RockPaperScissors";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<App />} />
            <Route path="/tictactoe" element={<TicTacToe />} />
            <Route path="/rockpaperscissors" element={<RockPaperScissors />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter

