import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { generateQuestions, retrieveCategories } from "../../api/functions";

export const GameSettingsForm = () => {
    const [ questionsCategories, setQuestionsCategories ] = useState([]);

    const [stile1, setStile1] = useState({
        display: "none"
    });

    const [stile2, setStile2] = useState({
        display: "none"
    });

    const [stile3, setStile3] = useState({
        display: "none"
    });

    let navigate = useNavigate();

    const numberOfQuestions = useRef(null);
    const questionCategory = useRef(null);
    const questionDifficulty = useRef(null);
    const questionType = useRef(null);

    useEffect(() => {
        retrieveCategories().then((res) => {
            setQuestionsCategories(res.data.trivia_categories);
        });
    }, []);

    function checkSettings() {
        setStile1({
            display: "none"
        });
        setStile2({
            display: "none"
        });
        setStile3({
            display: "none"
        });
        let n = numberOfQuestions.current.value;
        let c = questionCategory.current.value;
        let d = questionDifficulty.current.value;
        let t = questionType.current.value;
        console.log("N: " + n + " / C: " + c + " / D: " + d + "/ T:" + t);
        let nqIsValid = false;
        let settings = "/api.php?";
        if (n >= 10 && n <= 50) {
            settings += "amount=" + n;
            nqIsValid = true;
            if (c !== "" && c !== "any") {
                settings += "&category=" + c;
                if (d !== "" && d !== "any") {
                    settings += "&difficulty=" + d;
                    if (t !== "" && t !== "any") {
                        settings += "&type=" + t;
                    } else {
                        console.log("Tipo domanda non valido.");
                    }
                } else {
                    console.log("Difficolta' domanda non valida.");
                }
            } else {
                console.log("Categoria domanda non valida.");
            }
        } else {
            console.log("Numero domande non valido.");
        }
        console.log(settings);
        console.log(nqIsValid ? "Link valido" : "Link non valido");
        if (nqIsValid) {
            // navigate("/game", { 
            //     state: {
            //         link: settings 
            //     }
            // });
            loadQuestions(settings);
        }
    }

    function loadQuestions(link) {
        setStile1({
            display: "block"
        });
        generateQuestions(link).then((res) => {
            setStile1({
                display: "none"
            });
            const responseCode = res.data.response_code;
            const result = res.data.results;
            if (responseCode === 1) { // Risultato vuoto
                setStile2({
                    display: "block"
                });
            }
            if (responseCode === 0) { // Domande trovate
                setStile3({
                    display: "block"
                });
                navigate("/game", {
                    state: {
                        questions: result
                    }
                });
            }
        })
    }
    
    return (
        <div className="game-settings-form-div">
            <span className="setting-intro-text">Game settings</span>
            <input
                className="game-settings-form-input-div width-input" 
                type="number"
                name="num-questions"
                id="num-questions"
                placeholder="N° of questions (min 10 - max 50)"
                min="10" max="50" ref={numberOfQuestions} />
            <select className="game-settings-form-input-div width-select" name="category" id="category" ref={questionCategory}>
                <option value="">Choose a category</option>
                <option value="any">Any</option>
                {
                    questionsCategories.map((e) => {
                        return (
                            <option key={e.id} value={e.id}>{e.name}</option>
                        )
                    })
                }
            </select>
            <select className="game-settings-form-input-div width-select" name="diff" id="diff" ref={questionDifficulty}>
                <option value="">Choose a difficulty</option>
                <option value="any">Any</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            <select className="game-settings-form-input-div width-select" name="type" id="type" ref={questionType}>
                <option value="">Choose a question type</option>
                <option value="any">Any</option>
                <option value="multiple">Multiple choice</option>
                <option value="boolean">True / false</option>
            </select>
            <button className="start-game-button" onClick={ checkSettings }>START GAME</button>
            <span style={ stile1 } className="load-questions-span">Estraggo le domande.</span>
            <span style={ stile2 } className="no-questions-span">Nessuna domanda trovata con questi parametri, prova di nuovo.</span>
            <span style={ stile3 } className="start-game-span">Domande caricate, avvio il gioco.</span>
        </div>
    )
}