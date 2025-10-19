import { useState } from 'react';
import ActionButtons from './actionButtons/ActionButtons';
import './App.css';
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
import { binaryInsertion } from '../utils/utils';
import CountdownClock from './countdownClock/CountdownClock';
import { VALID_WORD_DICTIONARY } from '../data/dictionary';

const extractTilesFromDice = (dice: Tile[][]) => {
    const selected = [];

    for (let i = 0; i < 16; i += 1) {
        selected[i] = dice[i][0]
    };

    return selected;
};

type CurrentGuessProps = {
    text: string,
    value: number,
    mostRecentTilePosition: number | null;
    prevTilePositions: boolean[];
};

function App() {
    const [totalScore, setTotalScore] = useState(0);
    const [correctGuesses, setcorrectGuesses] = useState<Word[] | []>([]);
    const [hintPoints, setHintPoints] = useState(0);
    const [currentGuess, setCurrentGuess] = useState<CurrentGuessProps>(
        {
            text: "",
            value: 0,
            mostRecentTilePosition: null,
            prevTilePositions: Array(16).fill(false),
        }
    );
    const diceValues = extractTilesFromDice(DICE);

    const handleTileClick = (tile: Tile, position: number) => {
        console.log(currentGuess);
        const prevPosition = currentGuess.mostRecentTilePosition;
        const currentWord = currentGuess.text;

        if (currentGuess.mostRecentTilePosition === position) {
            const isRepeat = correctGuesses.filter(guess => guess.text === currentWord).length > 0;
            const isValid = VALID_WORD_DICTIONARY.some(word => word === currentWord);
            
            if (!isRepeat && isValid) {
                setcorrectGuesses(prev => binaryInsertion(currentGuess, prev));
                setTotalScore(prev => prev + currentGuess.value);
                setHintPoints(prev => prev + currentGuess.text.length);
            };

            setCurrentGuess({
                text: "",
                value: 0,
                mostRecentTilePosition: null, 
                prevTilePositions: Array(16).fill(false),
            });
        }

        else if (currentGuess.prevTilePositions[position] === true) {
            console.log("already selected");
            // TODO: Add already selected logic
        }

        else if (prevPosition === null || ADJACENT_LIST[prevPosition].includes(position)) {
            setCurrentGuess(prev => ({
                text: prev.text + tile.text,
                value: prev.value + tile.value,
                mostRecentTilePosition: position,
                prevTilePositions: {...prev.prevTilePositions, [position]: true},
            }));
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
                <div className="contentContainer">
                    <CountdownClock />
                    <GameBoard>
                        {diceValues.map((tile, index) => {
                            return (
                                <Tile key={index} tile={tile} position={index} handleClick={handleTileClick} />
                            )
                        })}
                    </GameBoard>
                    <ActionButtons>
                        <HintButton points={hintPoints} />
                        <SubmitButton />
                    </ActionButtons>
                    <LiveGuessDisplay guess={currentGuess.text} />
                    <GuessList guesses={correctGuesses} score={totalScore} />
                </div>
            </main>
            <Footer />
        </>
    )
}

export default App
