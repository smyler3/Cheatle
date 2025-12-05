import { useEffect, useMemo, useState } from 'react';
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
import { createPortal } from 'react-dom';
import ModalManager from '../modalManager/ModalManager';
import { useHints } from '../../hooks/hints/useHints';

type CurrentGuessType = {
    text: string,
    value: number,
    prevTileOrder: number[];
    prevTilePositions: boolean[];
};

export default function GameBody() {
    const { hintPoints, setHintPoints, markTopWordAsGuessed } = useHints();
    const [correctGuesses, setCorrectGuesses] = useState<Guess[]>([]);
    const [currentGuess, setCurrentGuess] = useState<CurrentGuessType>(
        {
            text: "",
            value: 0,
            prevTileOrder: [],
            prevTilePositions: Array(16).fill(false),
        }
    );

    const { data, isLoading, isError, error } = useChealteData();
    console.log('error', error);

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

    const { board, validWords, highestScoringWords } = data;

    const handleTileSelect = (tile: TileType, selectedPosition: number) => {
        const prevPosition = currentGuess.prevTileOrder.at(-1) || null;
        const currentWord = currentGuess.text;
        const currentValue = currentGuess.value;

        const addToCorrectGuesses = (isTopWord: boolean): void => {
            setCorrectGuesses(prev => binaryInsertion({...currentGuess, "isTopWord": isTopWord }, prev));
        }

        // Submitting guess
        if (currentGuess.prevTilePositions[selectedPosition] === true) {
            const isRepeat = correctGuesses.filter(guess => guess.text === currentWord).length > 0;
            const isValid = validWords.some(word => word.text === currentWord);
            
            if (!isRepeat && isValid) {
                const isTopWord = highestScoringWords.some(word => word.text === currentWord);

                addToCorrectGuesses(isTopWord);
                setHintPoints(prev => prev + currentGuess.text.length);

                if (isTopWord) {
                    markTopWordAsGuessed(currentValue, currentWord);
                }
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
            {createPortal(
                <ModalManager 
                    guesses={correctGuesses}
                    highestScoringWords={highestScoringWords}
                />, 
                document.body
            )}
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
                <GuessList
                    guesses={correctGuesses} 
                    shouldShowScore={true} 
                    highestScoringWords={highestScoringWords}
                />
            </div>
        </main>
    )
}
