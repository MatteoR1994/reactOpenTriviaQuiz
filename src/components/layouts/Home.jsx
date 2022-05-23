import Logo from "../../resources/images/trivia-logo.png";
import TriviaText from "../../resources/images/trivia-text.png";
import { GameSettingsForm } from "./GameSettingsForm";

export const Home = () => {
    return (
        <div className="home-container-div">
            <div className="home-logo-container-div">
                <img className="logo-img" src={ Logo } alt="Logo del gioco" />
                <img className="text-img" src={ TriviaText } alt="Scritta del gioco" />
            </div>
            <div className="game-settings-container-div">
                <GameSettingsForm />
            </div>
        </div>
    )
}