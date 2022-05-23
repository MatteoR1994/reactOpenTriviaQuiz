import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Logo from "../../resources/images/trivia-logo.png";
import LogoText from "../../resources/images/trivia-text.png";
import HappyFace from "../../resources/images/happy-face.png";
import NeutralFace from "../../resources/images/neutral-face.png";
import SadFace from "../../resources/images/sad-face.png";

export const GameBoard = () => {
    const [isActive, setIsActive] = useState(false);
    const [ finished, setFinished ] = useState(false);
    const [ questionsCounter, setQuestionsCounter ] = useState(0);
    const location = useLocation();
    const [ questions, setQuestions ] = useState(location.state.questions);

    const [ currentQuestion, setCurrentQuestion ] = useState("");
    const [ currentAnswers, setCurrentAnswers ] = useState([]);
    const [ questionIndex, setQuestionIndex ] = useState(0);
    const [ guessed, setGuessed ] = useState(0);

    useEffect(() => {
        console.log(questions);
    }, []);

    function initQuestion() {
        setCurrentQuestion(questions[questionIndex].question);
        const shuffledAnswers = shuffle([...questions[questionIndex].incorrect_answers, questions[questionIndex].correct_answer]);
        setCurrentAnswers(shuffledAnswers);
    }

    function startGame() {
        initQuestion();
        setQuestionIndex(questionIndex + 1);
        setQuestionsCounter(questionIndex + 1);
    }

    function nextQuestion() {
        if (questionIndex <= questions.length - 1) {
            setIsActive(false);
            resetAnswersButtons();
            setQuestionsCounter(questionIndex + 1);
            setQuestionIndex(questionIndex + 1);
            initQuestion();
        }
    }

    function shuffle(array) {
        const newArray = Array.from(array);
        for (let i = newArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = newArray[i];
            newArray[i] = newArray[j];
            newArray[j] = temp;
        }
        return newArray;
    }

    function formattedTextFromTextArea(text) {
        const txt = document.createElement("textarea");
        txt.innerHTML = text;
        return txt.value;
    }

    function handleClick(event) {
        if (!isActive) {
            const rightAnswer = questions[questionIndex - 1].correct_answer;
            const userAnswer = event.target.firstChild.textContent;
            event.target.style.backgroundColor = 'rgb(70, 70, 180)';
            event.target.style.color = "white";
            setIsActive(true);
            if (formattedTextFromTextArea(rightAnswer) === formattedTextFromTextArea(userAnswer)) {
                setGuessed(guessed + 1);
            }
            console.log("Right answer: " + formattedTextFromTextArea(rightAnswer));
            console.log("USer answer: " + formattedTextFromTextArea(userAnswer));
            console.log("Guessed: " + guessed);
        }
    };

    function checkResult() {
        setFinished(true);
    }

    function resetAnswersButtons() {
        const answersContainer = document.getElementsByClassName("answers-div")[0];
        const answersButtons = answersContainer.children;
        for (const answerButton of answersButtons) {
            answerButton.style.backgroundColor = 'whitesmoke';
            answerButton.style.color = "black";
        }
    }

    return (
        <div className="game-board-container">
            <div className="game-stats-container-div">
                <div className="game-header-logo">
                    <img src={ Logo } alt="Logo del sito" />
                </div>
                <div className="game-header-text">
                    <img src={ LogoText } alt="Logo scritta del sito" />
                </div>
                <div className="spacer"></div>
                <div className="prova-testo-contorno">
                    <span>{ questionsCounter }</span>
                    <span>&nbsp;/ { questions.length }</span>
                </div>
            </div>
            <div className="gameplay-container-div">
                <div className="result-game-container-div">
                    <div className="result-div">
                        {
                            finished ? <span className="result-quiz-text">{ guessed } / { questions.length }</span> : <span className="result-quiz-text"></span>
                        }
                        <span className="result-quiz-phrase">
                            {
                                finished && ( guessed >= 0 && guessed < questions.length / 3 ) ? "You really don't know anything!" : ""
                            }
                            {
                                finished && ( guessed >= questions.length / 3 && guessed < (questions.length / 3)*2 ) ? "You could do better..." : ""
                            }
                            {
                                finished && ( guessed >= (questions.length / 3)*2 && guessed < questions.length ) ? "You are a champion!!!" : ""
                            }
                        </span>
                    </div>
                    <div className="result-face">
                        {
                                finished && ( guessed >= 0 && guessed < questions.length / 3 ) ? <img src={ SadFace } alt="Icona per neutro" /> : ""
                            }
                            {
                                finished && ( guessed >= questions.length / 3 && guessed < (questions.length / 3)*2 ) ? <img src={ NeutralFace } alt="Icona per neutro" /> : ""
                            }
                            {
                                finished && ( guessed >= (questions.length / 3)*2 && guessed < questions.length ) ? <img src={ HappyFace } alt="Icona per neutro" /> : ""
                            }
                    </div>
                </div>
                <div className="questions-container-div">
                    <div className="quest-cont">
                        <div className="questions-movig-button">
                            <div className="spacer"></div>
                            {
                                questionIndex === 0 ? (<button className="start-question-button" onClick={ startGame }>START</button>) : (
                                    questionIndex === questions.length ? <button className="result-question-button" onClick={ checkResult }>RESULT</button> : 
                                    <button className="next-question-button" onClick={ nextQuestion }>NEXT</button>
                                )
                            }
                        </div>
                        <div className="question-div">
                            {
                                <span>{ formattedTextFromTextArea(currentQuestion) }</span>
                            }
                        </div>
                        <div className="answers-div">
                            {
                                currentAnswers.map((e, i) => {
                                    return (
                                        <button key={ i } onClick={ handleClick }>{ formattedTextFromTextArea(e) }</button>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}