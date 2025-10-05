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

const TILES = [
    { text: "F", value: 4 },
    { text: "F", value: 4 },
    { text: "F", value: 4 },
    { text: "F", value: 4 },
    { text: "F", value: 4 },
    { text: "F", value: 4 },
    { text: "F", value: 4 },
    { text: "F", value: 4 },
    { text: "F", value: 4 },
    { text: "F", value: 4 },
    { text: "F", value: 4 },
    { text: "F", value: 4 },
    { text: "F", value: 4 },
    { text: "F", value: 4 },
    { text: "F", value: 4 },
    { text: "F", value: 4 },
];

const GUESSES = [
    { word: "FFFFF", score: 14 },
    { word: "FFFFF", score: 14 },
    { word: "FFFFF", score: 14 },
    { word: "FFFFF", score: 14 },
    { word: "FFFFF", score: 14 },
    { word: "FFFFF", score: 14 },
    { word: "FFFFF", score: 14 },
];

function App() {
    return (
        <>
            <Header />
            <main>
                <Clock />
                <GameBoard>
                    {TILES.map((tile, index) => {
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
