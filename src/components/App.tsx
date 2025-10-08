import { DICE } from '../constants/dice';
import ActionButtons from './actionButtons/ActionButtons';
import './App.css';
import Clock from './clock/Clock';
import Footer from './footer/Footer';
import GameBoard from './gameBoard/GameBoard';
import GuessList from './guessList/GuessList';
import Header from './header/Header';
import HintButton from './hintButton/HintButton';
import LiveGuessDisplay from './liveGuessDisplay/LiveGuessDisplay';
import SubmitButton from './submitButton/SubmitButton';
import Tile from './tile/Tile';

const GUESSES = [
    { word: "FFFFF", score: 14 },
    { word: "FFFFF", score: 14 },
    { word: "FFFFF", score: 14 },
    { word: "FFFFF", score: 14 },
    { word: "FFFFF", score: 14 },
    { word: "FFFFF", score: 14 },
    { word: "FFFFF", score: 14 },
];

const extractTilesFromDice = (dice) => {
    const selected = [];

    for (let i = 0; i < 16; i += 1) {
        selected[i] = dice[i][0]
    };

    return selected;
};

function App() {
    const diceValues = extractTilesFromDice(DICE);

    return (
        <>
            <Header />
            <main>
                <Clock />
                <GameBoard>
                    {diceValues.map((tile, index) => {
                        return (
                            <Tile key={index} tile={tile} />
                        )
                    })}
                </GameBoard>
                <div
                    className="actionButtons"
                >
                    <HintButton />
                    <SubmitButton />
                </div>
                <LiveGuessDisplay guess={"FFF"} />
                <GuessList guesses={GUESSES} />
            </main>
            <Footer />
        </>
    )
}

export default App
