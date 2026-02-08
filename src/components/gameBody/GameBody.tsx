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
import { ADJACENT_LIST, TILE_STATE } from '../../constants';
import Tile from '../tile/Tile';
import { useCheatleData } from '../../hooks/cheatleData/useCheatleData';
import type { TileType } from '../../schema/CheatleSchema';
import { createPortal } from 'react-dom';
import ModalManager from '../modalManager/ModalManager';
import { useHints } from '../../hooks/hints/useHints';
import { useGameData } from '../../hooks/gameData/useGameData';
import { useTimer } from '../../hooks/timer/useTimer';
import { useModal } from '../../hooks/modal/useModal';
import type { LastGuessType } from '../../types/types';
import LoadingScreen from '../loadingScreen/LoadingScreen';
import DuplicateGuessIndicator from '../duplicateGuessIndicator/DuplicateGuessIndicator';
import styles from "./GameBody.module.css";
import { useLocalStorageData } from '../../hooks/localStorageData.tsx/useLocalStorageData';

type CurrentGuessType = {
    text: string,
    value: number,
    prevTileOrder: number[];
    prevTilePositions: boolean[];
};

export default function GameBody() {
    const { data, isLoading } = useCheatleData();
    const { isHydrated } = useLocalStorageData();
    const { stopTimer, isTimerDone } = useTimer();
    const { score, maxPossibleScore } = useGameData();
    const { setHintPoints, markTopWordAsGuessed } = useHints();
    const { openResultModal } = useModal();
    const { correctGuesses, setCorrectGuesses } = useGameData();

    // Previously submitted guess for display purposes
    const [lastGuess, setLastGuess] = useState<LastGuessType>({
        text: "",
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

    const clearLastGuess = () => {
        setLastGuess(prev => ({
            ...prev,
            tilePositions: [], 
            result: "idle",
        }));
    };

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

    if (isLoading || !data) {
        return (
            <LoadingScreen />
        );
    };

    // TODO: is this guard dumb?
    if (!isHydrated) {
        return (
            <LoadingScreen />
        );
    }

    const { board, validWords, topWords } = data;

    const handleUndo = () => {
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

    const handleTileSelect = (tile: TileType, selectedPosition: number) => {
        const prevPosition = currentGuess.prevTileOrder.at(-1);
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

            if (isRepeat) {
                setShowDuplicateModal(true);
            }
            
            if (!isRepeat && isValid) {
                const isCurrentATopWord = isTopWord(currentWord, topWords);

                addToCorrectGuesses(isCurrentATopWord);
                setHintPoints(prev => prev + currentGuess.text.length);

                if (isCurrentATopWord) {
                    markTopWordAsGuessed(currentValue, currentWord);
                }
            };

            setLastGuess({
                text: currentWord,
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
            <DuplicateGuessIndicator showDuplicateModal={showDuplicateModal} setShowDuplicateModal={setShowDuplicateModal} />
            <GameBoard>
                {board.map((tile, index) => {
                    return (
                        <Tile key={index} tile={tile} position={index} lastGuess={lastGuess} clearLastGuess={clearLastGuess} selectedTiles={currentGuess.prevTilePositions} handleClick={handleTileSelect} />
                    )
                })}
            </GameBoard>
            <ActionButtons>
                <HintButton />
                <FinishButton />
            </ActionButtons>
            <LiveGuessDisplay guess={currentGuess.text} lastGuess={lastGuess.text} handleUndoClick={handleUndo} />
            <GuessList
                shouldShowScore={true} 
            />
        </main>
    )
}
