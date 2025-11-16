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
import type { Word, TileType } from '../../schema/CheatleSchema';

type CurrentGuessProps = {
    text: string,
    value: number,
    mostRecentTilePosition: number | null;
    prevTilePositions: boolean[];
};

export default function GameBody() {
    const {data, isLoading, isError, error} = useChealteData();
    console.log('error', error);
    const [totalScore, setTotalScore] = useState(0);
    const [correctGuesses, setcorrectGuesses] = useState<Word[]>([]);
    const [hintPoints, setHintPoints] = useState(0);
    const [currentGuess, setCurrentGuess] = useState<CurrentGuessProps>(
        {
            text: "",
            value: 0,
            mostRecentTilePosition: null,
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

    const handleTileClick = (tile: TileType, position: number) => {
        console.log(currentGuess);
        const prevPosition = currentGuess.mostRecentTilePosition;
        const currentWord = currentGuess.text;

        if (currentGuess.mostRecentTilePosition === position) {
            const isRepeat = correctGuesses.filter(guess => guess.text === currentWord).length > 0;
            const isValid = validWords.some(word => word.text === currentWord);
            
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
        <main>
            <div className="contentContainer">
                <CountdownClock />
                <GameBoard>
                    {board.map((tile, index) => {
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
    )
}
