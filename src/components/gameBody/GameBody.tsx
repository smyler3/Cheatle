import { useCallback, useEffect, useState } from 'react';
import ActionButtons from '../actionButtons/ActionButtons';
import './GameBody.module.css';
import GameBoard from '../gameBoard/GameBoard';
import GuessList from '../guessList/GuessList';
import HintButton from '../hintButton/HintButton';
import LiveGuessDisplay from '../liveGuessDisplay/LiveGuessDisplay';
import FinishButton from '../finishButton/FinishButton';
import { binaryInsertion, isTopWord } from '../../utils/utils';
import CountdownTimer from '../countdownTimer/CountdownTimer';
import { ADJACENT_LIST } from '../../constants';
import Tile from '../tile/Tile';
import { useChealteData } from '../../hooks/useChealteData';
import type { TileType } from '../../schema/CheatleSchema';
import { createPortal } from 'react-dom';
import ModalManager from '../modalManager/ModalManager';
import { useHints } from '../../hooks/hints/useHints';
import { useGameData } from '../../hooks/gameData/useGameData';
import { useTimer } from '../../hooks/timer/useTimer';
import { useModal } from '../../hooks/modal/useModal';

type CurrentGuessType = {
    text: string,
    value: number,
    prevTileOrder: number[];
    prevTilePositions: boolean[];
};

export default function GameBody() {
    const { data, isLoading, isError, error } = useChealteData();
    // console.log("error:", error);
    const { stopTimer, isTimerDone } = useTimer();
    const { score, maxPossibleScore } = useGameData();
    const { hintPoints, setHintPoints, markTopWordAsGuessed } = useHints();
    const { openResultModal } = useModal();
    const { correctGuesses, setCorrectGuesses } = useGameData();

    const [currentGuess, setCurrentGuess] = useState<CurrentGuessType>(
        {
            text: "",
            value: 0,
            prevTileOrder: [],
            prevTilePositions: Array(16).fill(false),
        }
    );

    const endGame = useCallback(() => {
        stopTimer();
        openResultModal();
    }, [stopTimer, openResultModal]);

    useEffect(() => {
        if (isTimerDone) {
            endGame();
        }
    }, [isTimerDone, endGame]);

    useEffect(() => {
        if (score === maxPossibleScore) {
            endGame();
        };
    }, [score, maxPossibleScore, endGame]);

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

    const { board, validWords, topWords } = data;

    const handleTileSelect = (tile: TileType, selectedPosition: number) => {
        const prevPosition = currentGuess.prevTileOrder.at(-1) || null;
        const currentWord = currentGuess.text;
        const currentValue = currentGuess.value;

        const addToCorrectGuesses = (isTopWord: boolean): void => {
            setCorrectGuesses(prev => binaryInsertion({...currentGuess, "isTopWord": isTopWord }, prev));
        }

        if (isTimerDone) {
            return;
        };

        // Submitting guess
        if (currentGuess.prevTilePositions[selectedPosition] === true) {
            const isRepeat = correctGuesses.filter(guess => guess.text === currentWord).length > 0;
            const isValid = validWords.some(word => word.text === currentWord);
            
            if (!isRepeat && isValid) {
                const isCurrentATopWord = isTopWord(currentWord, topWords);

                addToCorrectGuesses(isCurrentATopWord);
                setHintPoints(prev => prev + currentGuess.text.length);

                if (isCurrentATopWord) {
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
                <ModalManager />, 
                document.body
            )}
            <CountdownTimer />
            <GameBoard>
                {board.map((tile, index) => {
                    return (
                        <Tile key={index} tile={tile} position={index} selectedTiles={currentGuess.prevTilePositions} handleClick={handleTileSelect} />
                    )
                })}
            </GameBoard>
            <ActionButtons>
                <HintButton points={hintPoints} />
                <FinishButton />
            </ActionButtons>
            <LiveGuessDisplay guess={currentGuess.text} />
            <GuessList
                shouldShowScore={true} 
            />
        </main>
    )
}
