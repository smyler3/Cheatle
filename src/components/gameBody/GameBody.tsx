import { useCallback, useEffect, useState } from 'react';
import ActionButtons from '../actionButtons/ActionButtons';
import './GameBody.module.css';
import GameBoard from '../gameBoard/GameBoard';
import GuessList from '../guessList/GuessList';
import HintButton from '../hintButton/HintButton';
import LiveGuessDisplay from '../liveGuessDisplay/LiveGuessDisplay';
import FinishButton from '../finishButton/FinishButton';
import CountdownTimer from '../countdownTimer/CountdownTimer';
import { ADJACENT_LIST, GUESS_ERRORS, MIN_WORD_LENGTH, TILE_STATE } from '../../constants';
import Tile from '../tile/Tile';
import type { TileType } from '../../schema/CheatleSchema';
import { createPortal } from 'react-dom';
import ModalManager from '../modalManager/ModalManager';
import { useGameState } from '../../hooks/gameState/useGameState';
import { useModal } from '../../hooks/modal/useModal';
import type { LastGuessType, WordSubset, ValidWordsMap, CurrentGuessType, GuessErrorsType } from '../../types/types';
import styles from "./GameBody.module.css";
import { postCheatleDone } from '../../hooks/fetchCheatleData';
import ResultsButton from '../resultsButton/ResultsButton';
import { useFetchedData } from '../../hooks/fetchedData/useFetchedData';
import IncorrectDetailsBanner from '../incorrectDetailsBanner/IncorrectDetailsBanner';

export default function GameBody() {
    const { board, maxPossibleScore, minTopWordValue } = useFetchedData();
    const { validWordsMap, setValidWordsMap } = useGameState();
    const { 
        addToTopGuesses,
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
    const [incorrectBannerType, setIncorrectBannerType] = useState<GuessErrorsType | null>(null);
    const [incorrectGuessCount, setIncorrectGuessCount] = useState(0);

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

    // End the game once the timer finishes
    useEffect(() => {
        if (isTimerDone) {
            endGame();
        }
    }, [isTimerDone, endGame]);

    // End the game once the max score is reached
    useEffect(() => {
        if (score === maxPossibleScore) {
            stopTimer();
        };
    }, [score, maxPossibleScore, stopTimer]);

    const handleUndo = () => {
        if (isTimerDone) {
            return;
        };

        const prevPosition = currentGuess.prevTileOrder.at(-1);

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

    const handleSubmit = (currentGuess: CurrentGuessType) => {
        if (isTimerDone) {
            return;
        };

        const currentText: string = currentGuess.text;
        const currentValue: number = currentGuess.value;
        const guess = validWordsMap.get(currentValue)?.get(currentText);
        const isRepeat = guess?.isGuessed;
        const isTooSmall = currentText.length < MIN_WORD_LENGTH;
        const isValid = guess;

        if (isRepeat || isTooSmall) {
            setIncorrectGuessCount(prev => prev + 1);
            setIncorrectBannerType(isRepeat ? GUESS_ERRORS.DUPLICATE : GUESS_ERRORS.TOO_SMALL);
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
            addToTopGuesses(currentValue);
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

    const handleTileSelect = (tile: TileType, selectedPosition: number) => {
        const prevPosition: number | undefined = currentGuess.prevTileOrder.at(-1);

        if (isTimerDone) {
            return;
        };

        // Submitting guess
        if (currentGuess.prevTilePositions[selectedPosition] === true) {
            handleSubmit(currentGuess)
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
            <IncorrectDetailsBanner key={incorrectGuessCount} showType={incorrectBannerType} setShowType={setIncorrectBannerType} />
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
                currentGuess={currentGuess}
                lastGuess={lastGuess}
                handleUndoClick={handleUndo} 
                handleSubmitClick={handleSubmit}
            />
            <GuessList
                shouldShowScore={true} 
            />
        </main>
    )
}
