import { useQuery } from "@tanstack/react-query";
import { fetchCheatleData } from "../hooks/fetchCheatleData";
import defaultData from "../constants/defaultData";
import type { CheatleResponse } from "../schema/CheatleSchema";
import { GameStateProvider } from "../hooks/gameState/GameStateProvider";
import { ModalProvider } from "../hooks/modal/ModalProvider";
import LoadingScreen from "./loadingScreen/LoadingScreen";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import GameBody from "./gameBody/GameBody";

export default function DataWrapper() {
    const query = useQuery({
        queryKey: ["cheatle"],
        queryFn: () => fetchCheatleData(),
        refetchOnWindowFocus: false,
    });

    const { isLoading, isError, data } = query;

    if (isLoading) {
        return (
            <LoadingScreen />
        );
    };

    const fetchedData: CheatleResponse = isError || data == undefined ? defaultData : data;
    const boardKey: string = fetchedData.board.reduce((key, tile) => key += tile.text, "");

    const { board, validWords, topWords } = fetchedData;

    return (
        <GameStateProvider boardKey={boardKey} topWords={topWords}>
            <ModalProvider>
                <Header />
                <GameBody />
                <Footer />
            </ModalProvider>
        </GameStateProvider>
    )
};