import { useCallback, useEffect, useState } from 'react';
import ActionButtons from '../actionButtons/ActionButtons';
import './GameBody.module.css';
import GameBoard from '../gameBoard/GameBoard';
import GuessList from '../guessList/GuessList';
import HintButton from '../hintButton/HintButton';
import LiveGuessDisplay from '../liveGuessDisplay/LiveGuessDisplay';
import FinishButton from '../finishButton/FinishButton';
import CountdownTimer from '../countdownTimer/CountdownTimer';
import { ADJACENT_LIST, MIN_WORD_LENGTH, TILE_STATE } from '../../constants';
import Tile from '../tile/Tile';
import type { TileType } from '../../schema/CheatleSchema';
import { createPortal } from 'react-dom';
import ModalManager from '../modalManager/ModalManager';
import { useGameState } from '../../hooks/gameState/useGameState';
import { useModal } from '../../hooks/modal/useModal';
import type { LastGuessType, WordSubset, ValidWordsMap, CurrentGuessType } from '../../types/types';
import DuplicateGuessIndicator from '../duplicateGuessIndicator/DuplicateGuessIndicator';
import styles from "./GameBody.module.css";
import { postCheatleDone } from '../../hooks/fetchCheatleData';
import ResultsButton from '../resultsButton/ResultsButton';
import { useFetchedData } from '../../hooks/fetchedData/useFetchedData';

export default function GameBody() {
    const { board, maxPossibleScore } = useFetchedData();
    const { validWordsMap, setValidWordsMap } = useGameState();
    const { 
        startTimer,
        stopTimer, 
        isTimerDone, 
        setHintPoints, 
        setCorrectGuessCount,
        score, 
    } = useGameState();
    const { openResultModal } = useModal();

    // Previously submitted guess for display purposes
    const [lastGuess, setLastGuess] = useState<LastGuessType>({
        text: "",
        value: "",
        tilePositions: [],
        result: TILE_STATE.INCORRECT, 
    });
    const [currentGuess, setCurrentGuess] = useState<CurrentGuessType>(
        {
            text: "",
            value: 0,
            prevTileOrder: [],
            prevTilePositions: Array(16).fill(false),
        }
    );
    const [showDuplicateModal, setShowDuplicateModal] = useState(false);
    // const [showTooSmallModal, setShowTooSmallModal] = useState(false);
    const [duplicateGuessCount, setDuplicateGuessCount] = useState(0);

    const clearLastGuess = () => {
        setLastGuess(prev => ({
            ...prev,
            tilePositions: [], 
            result: "idle",
        }));
    };

    const endGame = useCallback(() => {
        openResultModal();
        postCheatleDone();
    }, [openResultModal]);

    // Start the game every time you enter this page
    useEffect(() => {
        startTimer();
    }, [startTimer]);

    // Do these need to be useEffects?
    useEffect(() => {
        if (isTimerDone) {
            endGame();
        }
    }, [isTimerDone, endGame]);

    useEffect(() => {
        if (score === maxPossibleScore) {
            stopTimer();
        };
    }, [score, maxPossibleScore, stopTimer]);

    const handleUndo = () => {
        const prevPosition = currentGuess.prevTileOrder.at(-1);

        if (isTimerDone) {
            return;
        };

        if (prevPosition === undefined) {
            return;
        };

        const lastTile = board[prevPosition];
        const newGuessText = currentGuess.text.slice(0, -lastTile.text.length);
        const newGuessValue = currentGuess.value - lastTile.value;
        const newTileOrder = currentGuess.prevTileOrder.slice(0, -1);

        setCurrentGuess(prev => ({
            text: newGuessText,
            value: newGuessValue,
            prevTileOrder: [...newTileOrder],
            prevTilePositions: {...prev.prevTilePositions, [prevPosition]: false},
        }))
    }

    const handleTileSelect = (tile: TileType, selectedPosition: number) => {
        const prevPosition: number | undefined = currentGuess.prevTileOrder.at(-1);
        const currentText: string = currentGuess.text;
        const currentValue: number = currentGuess.value;

        if (isTimerDone) {
            return;
        };

        // Submitting guess
        if (currentGuess.prevTilePositions[selectedPosition] === true) {
            const guess = validWordsMap.get(currentValue)?.get(currentText);
            const isRepeat = guess?.isGuessed;
            const isTooSmall = currentText.length < MIN_WORD_LENGTH;
            const isValid = guess;

            if (isRepeat) {
                setDuplicateGuessCount(prev => prev + 1);
                setShowDuplicateModal(true);
            }

            if (isTooSmall) {
                // Add stuff here
            }
            
            if (!isRepeat && !isTooSmall && isValid) {
                // Adding the correct guess
                setValidWordsMap(prev => {
                    const innerWordMap = prev.get(currentValue);
        
                    if (!innerWordMap) {
                        return prev;
                    };
        
                    const newWord: WordSubset = { revealedText: currentText, isGuessed: true };
        
                    const updatedInnerWordMap: Map<string, WordSubset> = new Map(innerWordMap.set(currentText, newWord));
                    const updatedValidWords: ValidWordsMap = new Map(prev).set(currentValue, updatedInnerWordMap);
        
                    return updatedValidWords;
                })
                setCorrectGuessCount(prev => prev += 1);
                setHintPoints(prev => prev + currentGuess.text.length);
            };

            setLastGuess({
                text: currentText,
                value: String(currentValue),
                tilePositions: currentGuess.prevTileOrder,
                result: (!isRepeat && isValid) ? TILE_STATE.CORRECT : TILE_STATE.INCORRECT,
            });

            setCurrentGuess({
                text: "",
                value: 0,
                prevTileOrder: [],
                prevTilePositions: Array(16).fill(false),
            });
        }

        // Adding to guess
        else if (prevPosition === undefined || ADJACENT_LIST[prevPosition].includes(selectedPosition)) {
            setCurrentGuess(prev => ({
                text: prev.text + tile.text,
                value: prev.value + tile.value,
                prevTileOrder: [...prev.prevTileOrder, selectedPosition],
                prevTilePositions: {...prev.prevTilePositions, [selectedPosition]: true},
            }));
        }

        // Else invalid tile selected
    };

    return (
        <main className={styles.gameBodyMain}>
            {createPortal(
                <ModalManager />, 
                document.body
            )}
            <CountdownTimer />
            <DuplicateGuessIndicator key={duplicateGuessCount} showDuplicateModal={showDuplicateModal} setShowDuplicateModal={setShowDuplicateModal} />
            <GameBoard>
                {board.map((tile, index) => {
                    return (
                        <Tile key={index} tile={tile} position={index} lastGuess={lastGuess} clearLastGuess={clearLastGuess} selectedTiles={currentGuess.prevTilePositions} handleClick={handleTileSelect} />
                    )
                })}
            </GameBoard>
            <ActionButtons>
                {isTimerDone ? (
                    <ResultsButton />
                ) : (
                    <>
                        <HintButton />
                        <FinishButton />
                    </>
                )}
            </ActionButtons>
            <LiveGuessDisplay 
                guess={currentGuess.text}
                value={currentGuess.value} 
                lastGuess={lastGuess.text} 
                lastValue={lastGuess.value}
                handleUndoClick={handleUndo} 
            />
            <GuessList
                shouldShowScore={true} 
            />
        </main>
    )
}
