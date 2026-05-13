import { createContext, useContext } from "react";

type ScreenContextType = {
    shouldShowGame: boolean, 
    showHomeScreen: () => void, 
    showGameScreen: () => void, 
}

export const ScreenContext = createContext({} as ScreenContextType);

export const useScreen = () => useContext(ScreenContext);