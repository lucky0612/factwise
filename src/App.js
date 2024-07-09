import React, { useState, useEffect } from 'react';
import './app.css';

const App = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winningSquares, setWinningSquares] = useState([]);

    useEffect(() => {
        const winnerInfo = calculateWinner(squares);
        if (winnerInfo) {
            setWinningSquares(winnerInfo.line);
        } else {
            setWinningSquares([]);
        }
    }, [squares]);

    const handleClick = (index) => {
        if (squares[index] || winningSquares.length > 0) return;
        const newSquares = squares.slice();
        newSquares[index] = isXNext ? 'X' : '✓';
        setSquares(newSquares);
        setIsXNext(!isXNext);
    };

    const renderSquare = (index) => {
        return (
            <button
                className={`square ${winningSquares.includes(index) ? 'winning-square' : ''}`}
                onClick={() => handleClick(index)}
            >
                {squares[index]}
            </button>
        );
    };

    const winnerInfo = calculateWinner(squares);
    let status;
    if (winnerInfo) {
        status = `Player ${winnerInfo.winner === 'X' ? 1 : 2} won!`;
    } else {
        status = `Next player: ${isXNext ? 'X' : '✓'}`;
    }

    return (
        <div className="game">
            <h1 className="heading">TIC-TAC-TOE</h1>
            <div className="status">{status}</div>
            <div className="board">
                {Array.from({ length: 9 }, (_, index) => renderSquare(index))}
            </div>
            <button className="reset" onClick={() => {
                setSquares(Array(9).fill(null));
                setIsXNext(true);
                setWinningSquares([]);
            }}>
                RESET
            </button>
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
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], line: [a, b, c] };
        }
    }
    return null;
};

export default App;
