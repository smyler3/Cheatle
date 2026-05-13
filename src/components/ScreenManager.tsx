import Footer from "./footer/Footer"
import Header from "./header/Header"
import Home from "./home/Home"
import { useScreen } from "../hooks/setScreen/useScreen";
import GameBody from "./gameBody/GameBody";

export default function ScreenManager() {
    const { shouldShowGame } = useScreen();

    if (shouldShowGame) {
        return (
            <>
                <Header />
                <GameBody />
                <Footer />
            </>
        )
    };

    return (
        <Home /> 
    )
}