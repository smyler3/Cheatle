import { useState } from "react";
import { ScreenContext } from "./useScreen";

type ScreenProviderProps = {
    children: React.ReactNode,
}

export default function ScreenProvider({ children }: ScreenProviderProps) {
    const [shouldShowGame, setShouldShowGame] = useState(false);

    const showHomeScreen = () => setShouldShowGame(false);

    const showGameScreen = () => setShouldShowGame(true);

    return (
        <ScreenContext.Provider value={{
            shouldShowGame, 
            showHomeScreen, 
            showGameScreen,
        }}>
            {children}
        </ScreenContext.Provider>
    )
}