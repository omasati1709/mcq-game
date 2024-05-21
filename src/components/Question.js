import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import questions from '../data/questions';
import './Question.css';

function Question() {
    const { id } = useParams();
    const navigate = useNavigate();
    const questionIndex = parseInt(id, 10) - 1;
    const [selectedAnswers, setSelectedAnswers] = useState(
        JSON.parse(localStorage.getItem('selectedAnswers')) || {}
    );
    const [score, setScore] = useState(
        JSON.parse(localStorage.getItem('score')) || 0
    );

    // Retrieve 10 random questions on component mount
    useEffect(() => {
        const storedQuestions = JSON.parse(localStorage.getItem('questions'));
        if (!storedQuestions) {
            const randomQuestions = shuffleArray(questions).slice(0, 10);
            localStorage.setItem('questions', JSON.stringify(randomQuestions));
        }
    }, []);

    // Retrieve current question
    const storedQuestions = JSON.parse(localStorage.getItem('questions'));
    const currentQuestion = storedQuestions ? storedQuestions[questionIndex] : null;

    if (!currentQuestion) {
        return <div>Loading...</div>; // Handle case where questions haven't been loaded yet
    }

    const handleAnswer = (answer) => {
        const updatedAnswers = { ...selectedAnswers, [questionIndex]: answer };
        setSelectedAnswers(updatedAnswers);
        localStorage.setItem('selectedAnswers', JSON.stringify(updatedAnswers));
        if (answer === currentQuestion.correctAnswer) {
            const newScore = score + 1;
            setScore(newScore);
            localStorage.setItem('score', newScore);
        }
    };

    const handleNext = () => {
        if (!selectedAnswers[questionIndex]) {
            alert('Please select an answer before moving to the next question.');
            return;
        }
        if (questionIndex < 9) { // 10 questions in total
            navigate(`/question/${questionIndex + 2}`);
        } else {
            navigate('/result');
        }
    };

    const handlePrevious = () => {
        if (questionIndex > 0) {
            navigate(`/question/${questionIndex}`);
        } else {
            navigate('/');
        }
    };

    return (
        <div className="question">
            <h2>{currentQuestion.question}</h2>
            <ul>
                {currentQuestion.options.map((option, index) => (
                    <li
                        key={index}
                        onClick={() => handleAnswer(option)}
                        className={selectedAnswers[questionIndex] === option ? 'selected' : ''}
                    >
                        {option}
                    </li>
                ))}
            </ul>
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handleNext} disabled={!selectedAnswers[questionIndex]}>Next</button>
        </div>
    );
}

// Function to shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export default Question;
