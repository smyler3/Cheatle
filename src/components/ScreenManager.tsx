import Footer from "./footer/Footer";
import Header from "./header/Header";
import Home from "./home/Home";
import { useScreen } from "../hooks/setScreen/useScreen";
import GameBody from "./gameBody/GameBody";
import { useGameState } from "../hooks/gameState/useGameState";
import { saveGame } from "../utils/saveGame";
import { useEffect } from "react";
import { useFetchedData } from "../hooks/fetchedData/useFetchedData";

export default function ScreenManager() {
    const { apiVersion } = useFetchedData();
    const { shouldShowGame } = useScreen();
    const gameState = useGameState();

    // When the user switches screens their progress will be saved
    useEffect(() => {
        saveGame({ gameState, apiVersion });
    }, [shouldShowGame, gameState, apiVersion]);

    if (shouldShowGame) {
        return (
            <>
                <Header />
                <GameBody />
                <Footer />
            </>
        );
    }

    return <Home />;
}
