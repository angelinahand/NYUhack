import Square from './Square';
import { useState } from 'react';

const defaultSquares = () => (new Array(9)).fill(null);

function Board() {

    const [squares, setSquares] = useState(defaultSquares());

    return (
        <section className="board">
            {squares.map(square => <Square />)}

        </section>
    )
}

export default Board
