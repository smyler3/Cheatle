import { useEffect, useRef, useState } from "react";
import { LocalStorageDataContext } from "./useLocalStorageData";
import { useCheatleData } from "../cheatleData/useCheatleData";
import type { gameState } from "../../types/types";
import type { Hint } from "../../schema/CheatleSchema";

type LocalStorageDataProviderProps = {
    children: React.ReactNode,
};

export const LocalStorageDataProvider = ({ children }: LocalStorageDataProviderProps) => {
    const { data, isLoading } = useCheatleData();

    const [isHydrated, setIsHydrated] = useState(false);
    const [savedGameState, setSavedGameState] = useState<gameState | null>(null);

    const snapshotGetters = useRef<(() => Partial<gameState>)[]>([]);

    const registerSnapshotGetter = (getter: () => Partial<gameState>) => {
        snapshotGetters.current.push(getter);
    };

    const convertTopWordHintsToJsonFromMap = (map: Map<number, Hint[]>): Record<number, Hint[]> => {
        return Object.fromEntries(map.entries());
    };

    const convertTopWordHintsToMapFromJson = (record: Record<number, Hint[]>): Map<number, Hint[]> => {
        return new Map(
            Object.entries(record)
                .map(([key, value]) => [Number(key), value] as [number, Hint[]])
                .sort(([a], [b]) => b - a) // descending
        );
    };

    const clearLocalStorage = () => {
        localStorage.clear();
        setIsHydrated(true);
    };

    // Rehydrate the site with stored data
    useEffect(() => {
        if(isLoading || !data) {
            return;
        };

        const boardKey = data.board.reduce((key, tile) => key += tile.text, "");
        const rawData = localStorage.getItem("gameState");

        if (!rawData) {
            clearLocalStorage();
            return;
        }

        try {
            const parsedData = JSON.parse(rawData);
            const { savedBoardKey, savedGameState } = parsedData;

            if (savedBoardKey !== boardKey) {
                clearLocalStorage();
                return;
            };

            const topWordHintsMap = savedGameState.topWordHints 
                ? convertTopWordHintsToMapFromJson(savedGameState.topWordHints)
                : new Map();

            setSavedGameState({
                ...savedGameState,
                topWordHints: topWordHintsMap,
            });
            setIsHydrated(true);
        } catch {
            clearLocalStorage();
        }
    }, [isLoading, data]);

    // Save game data before exiting the app
    useEffect(() => {
        const updateLocalStorage = () => {
            if (!data) return;

            const boardKey = data.board.reduce((key, tile) => key += tile.text, "");

            const combinedState = snapshotGetters.current.reduce(
                (acc, getter) => ({ ...acc, ...getter() }),
                {} as Partial<gameState>
            );

            if (combinedState.topWordHints instanceof Map) {
                combinedState.topWordHints =
                    convertTopWordHintsToJsonFromMap(combinedState.topWordHints) as unknown as Map<number, Hint[]>;
            };

            const saveData = {
                savedBoardKey: boardKey,
                savedGameState: combinedState,
            };

            localStorage.setItem("gameState", JSON.stringify(saveData));
        };

        const handleSave = () => updateLocalStorage();

        window.addEventListener("beforeunload", handleSave);

        const visibilityHandler = () => {
            if (document.visibilityState === "hidden") {
                handleSave();
            }
        };

        document.addEventListener("visibilitychange", visibilityHandler);

        return () => {
            window.removeEventListener("beforeunload", handleSave);
            document.removeEventListener("visibilitychange", visibilityHandler);
        };
    }, [data]);
    

    return (
        <LocalStorageDataContext.Provider value={{
            isHydrated,
            savedGameState,
            registerSnapshotGetter,
        }}>
            {children}
        </LocalStorageDataContext.Provider>
    )
}