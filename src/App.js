import React, { useState } from 'react';
import './app.css';

const App = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const handleClick = (index) => {
        if (squares[index] || calculateWinner(squares)) return;
        const newSquares = squares.slice();
        newSquares[index] = isXNext ? 'X' : 'O';
        setSquares(newSquares);
        setIsXNext(!isXNext);

    };
    const renderSquare = (index) => {
        return (
            <button className="square" onClick={() => handleClick(index)}>
                {squares[index]}
            </button>

        );
    };
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = `Player ${winner === 'X' ? 1 : 2} won!`;
    }
    else {
        status = `Next player: ${isXNext ? 'X' : 'O'}`;
    }
    return (
        <div className="game">
            <div className="status">{status}</div>
            <div className='board'>{Array.from({ length: 9 }, (_, index) => renderSquare(index))}</div>
            <button className='reset' onClick={() => setSquares(Array(9).fill(null))}>RESET</button>

        </div>
    );

};
const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]

    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
};
export default App;
