import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useQuery } from "@tanstack/react-query";
import { fetchCheatleData } from "../hooks/fetchCheatleData";
import { GameStateProvider } from "../hooks/gameState/GameStateProvider";
import { ModalProvider } from "../hooks/modal/ModalProvider";
import FetchedDataProvider from '../hooks/fetchedData/FetchedDataProvider';
import ScreenManager from './ScreenManager';
import ScreenProvider from '../hooks/setScreen/ScreenProvider';

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AppContent />
        </QueryClientProvider>
    )
}

function AppContent() {
    const query = useQuery({
        queryKey: ["cheatle"],
        queryFn: () => fetchCheatleData(),
        refetchOnWindowFocus: false,
    });

    // const { isLoading, isError, data } = query;

    // if (isLoading) {
    //     return (
    //         <LoadingScreen />
    //     );
    // };

    const isError = true;
    const data = undefined;

    return (
        <FetchedDataProvider isError={isError} data={data}>
            <GameStateProvider>
                <ModalProvider>
                    <ScreenProvider>
                        <ScreenManager />
                    </ScreenProvider>
                </ModalProvider>
            </GameStateProvider>
        </FetchedDataProvider>
    )
};


