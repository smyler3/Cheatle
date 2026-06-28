import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useQuery } from "@tanstack/react-query";
import { fetchCheatleData } from "../hooks/fetchCheatleData";
import { GameStateProvider } from "../hooks/gameState/GameStateProvider";
import { ModalProvider } from "../hooks/modal/ModalProvider";
import FetchedDataProvider from '../hooks/fetchedData/FetchedDataProvider';
import ScreenManager from './ScreenManager';
import ScreenProvider from '../hooks/setScreen/ScreenProvider';
import LoadingScreen from './loadingScreen/LoadingScreen';
import { useFetchedData } from '../hooks/fetchedData/useFetchedData';

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <OuterAppContent />
        </QueryClientProvider>
    );
};

function OuterAppContent() {
    const query = useQuery({
        queryKey: ["cheatle"],
        queryFn: () => fetchCheatleData(),
        refetchOnWindowFocus: false,
        staleTime: 0,
        gcTime: 0,
    });

    const { isLoading, isError, data } = query;

    if (isLoading) {
        return (
            <LoadingScreen />
        );
    };

    return (
        <FetchedDataProvider isError={isError} data={data}>
            <InnerAppContent />
        </FetchedDataProvider>
    );
};

function InnerAppContent() {
    const { boardKey } = useFetchedData();

    return (
        <GameStateProvider key={boardKey}>
            <ModalProvider>
                <ScreenProvider>
                    <ScreenManager />
                </ScreenProvider>
            </ModalProvider>
        </GameStateProvider>
    );
};


