// Result.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Result.css'; // Import CSS file for styling

function Result() {
    const score = JSON.parse(localStorage.getItem('score')) || 0;

    const handlePlayAgain = () => {
        localStorage.removeItem('selectedAnswers'); // Remove selected answers
        localStorage.removeItem('score'); // Reset score
    };

    return (
        <div className="container">
            <div className="box">
                <h1>Your Score: {score}</h1>
                <Link to="/" onClick={handlePlayAgain}>
                    <button className="play-again-button">Play Again</button>
                </Link>
            </div>
        </div>
    );
}

export default Result;