import { useState } from 'react';
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
import DICE from '../constants/dice';
import ADJACENT_LIST from '../constants/adjacentList';


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
    const [currentGuess, setCurrentGuess] = useState(
        {
            text: "",
            value: 0,
            mostRecentTilePosition: null,
            prevTilePositions: [],
        }
    );
    const diceValues = extractTilesFromDice(DICE);

    const handleTileClick = (tile, position) => {
        const prevPosition = currentGuess.mostRecentTilePosition;

        console.log("prev", currentGuess, prevPosition);
        // console.log(currentGuess.prevTilePositions);

        if (currentGuess.mostRecentTilePosition === position) {
            console.log("submit");
            // TODO: Add submit logic
        }

        else if (currentGuess.prevTilePositions.includes(position)) {
            console.log("already selected");
            // TODO: Add already selected logic
        }

        // {ADJACENT_LIST}
        // console.log("looking", ADJACENT_LIST[prevPosition]);

        else if (prevPosition === null || prevPosition !== null && ADJACENT_LIST[prevPosition].includes(position)) {
            const newText = currentGuess.text + tile.text;
            const newValue = currentGuess.value + tile.value;
            const newPrevTilePositions = [...currentGuess.prevTilePositions, position];
            console.log("adding", newPrevTilePositions);

            setCurrentGuess({
                text: newText,
                value: newValue,
                mostRecentTilePosition: position,
                prevTilePositions: newPrevTilePositions,
            });
        }

        else {
            console.log("invalid selection");
            // TODO: add invalid selected logic
        }
    };

    return (
        <>
            <Header />
            <main>
                <Clock />
                <GameBoard>
                    {diceValues.map((tile, index) => {
                        return (
                            <Tile key={index} tile={tile} position={index} handleClick={handleTileClick} />
                        )
                    })}
                </GameBoard>
                <div
                    className="actionButtons"
                >
                    <HintButton />
                    <SubmitButton />
                </div>
                <LiveGuessDisplay guess={currentGuess.text} />
                <GuessList guesses={GUESSES} />
            </main>
            <Footer />
        </>
    )
}

export default App
