import { useState } from 'react';
import ActionButtons from '../actionButtons/ActionButtons';
import './GameBody.module.css';
import GameBoard from '../gameBoard/GameBoard';
import GuessList from '../guessList/GuessList';
import HintButton from '../hintButton/HintButton';
import LiveGuessDisplay from '../liveGuessDisplay/LiveGuessDisplay';
import SubmitButton from '../submitButton/SubmitButton';
import { binaryInsertion } from '../../utils/utils';
import CountdownClock from '../countdownClock/CountdownClock';
import { ADJACENT_LIST } from '../../constants';
import Tile from '../tile/Tile';
import { useChealteData } from '../../hooks/useChealteData';
import type { TileType } from '../../schema/CheatleSchema';
import type { Guess } from '../../types/types';

type CurrentGuessProps = {
    text: string,
    value: number,
    prevTileOrder: number[];
    prevTilePositions: boolean[];
};

export default function GameBody() {
    const {data, isLoading, isError, error} = useChealteData();
    console.log('error', error);
    const [totalScore, setTotalScore] = useState(0);
    const [correctGuesses, setCorrectGuesses] = useState<Guess[]>([]);
    const [hintPoints, setHintPoints] = useState(0);
    const [currentGuess, setCurrentGuess] = useState<CurrentGuessProps>(
        {
            text: "",
            value: 0,
            prevTileOrder: [],
            prevTilePositions: Array(16).fill(false),
        }
    );

    if (isError) {
        return (
            <div>Something went wrong</div>
        );
    };

    if (isLoading || !data) {
        return (
            <div>...Loading</div>
        );
    };

    const {board, validWords, highestScoringWords} = data;

    const handleTileSelect = (tile: TileType, selectedPosition: number) => {
        console.log(currentGuess);
        const prevPosition = currentGuess.prevTileOrder.at(-1) || null;
        const currentWord = currentGuess.text;

        const addToCorrectGuesses = (): void => {
            const isTopWord = highestScoringWords.some(word => word.text === currentWord);
            setCorrectGuesses(prev => binaryInsertion({...currentGuess, "isTopWord": isTopWord }, prev));
        }

        // Submitting guess
        if (currentGuess.prevTilePositions[selectedPosition] === true) {
            const isRepeat = correctGuesses.filter(guess => guess.text === currentWord).length > 0;
            const isValid = validWords.some(word => word.text === currentWord);
            
            if (!isRepeat && isValid) {
                addToCorrectGuesses();
                setTotalScore(prev => prev + currentGuess.value);
                setHintPoints(prev => prev + currentGuess.text.length);
            };

            setCurrentGuess({
                text: "",
                value: 0,
                prevTileOrder: [],
                prevTilePositions: Array(16).fill(false),
            });
        }

        // Adding to guess
        else if (prevPosition === null || ADJACENT_LIST[prevPosition].includes(selectedPosition)) {
            setCurrentGuess(prev => ({
                text: prev.text + tile.text,
                value: prev.value + tile.value,
                // mostRecentTilePosition: selectedPosition,
                prevTileOrder: [...prev.prevTileOrder, selectedPosition],
                prevTilePositions: {...prev.prevTilePositions, [selectedPosition]: true},
            }));
        }

        // Invalid tile selected
        else {
            console.log("invalid selection");
            // TODO: add invalid selected logic
        }
    };

    return (
        <main>
            <div className="contentContainer">
                <CountdownClock />
                <GameBoard>
                    {board.map((tile, index) => {
                        return (
                            <Tile key={index} tile={tile} position={index} handleClick={handleTileSelect} />
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
    )
}
