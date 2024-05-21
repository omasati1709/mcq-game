// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import CSS file for styling

function Home() {
    return (
        <div className="container">
            <div className="box">
                <h1>Welcome to the MCQ Game</h1>
                <Link to="/question/1">
                    <button className="start-button">Start Quiz</button>
                </Link>
                <p className="copyright"> @omasati</p>
            </div>
        </div>
    );
}

export default Home;
