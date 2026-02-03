import { createContext, useContext} from "react";
import type { gameState } from "../../types/types";

type LocalStorageDataType = {
    isHydrated: boolean;
    savedGameState: gameState | null;
    registerSnapshotGetter: (getter: () => Partial<gameState>) => void,
};

export const LocalStorageDataContext = createContext<LocalStorageDataType>({} as LocalStorageDataType);

export const useLocalStorageData = () => useContext(LocalStorageDataContext);