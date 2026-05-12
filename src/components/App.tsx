import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useQuery } from "@tanstack/react-query";
import { fetchCheatleData } from "../hooks/fetchCheatleData";
import { GameStateProvider } from "../hooks/gameState/GameStateProvider";
import { ModalProvider } from "../hooks/modal/ModalProvider";
import LoadingScreen from "./loadingScreen/LoadingScreen";
import Home from './home/Home';
import FetchedDataProvider from '../hooks/fetchedData/FetchedDataProvider';
import Footer from './footer/Footer';

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
                    <Home />
                    {/* <Footer /> */}
                    {/* Either control home or game rendering from here, or do it down in a shared parent component */}
                    {/* <Header />
                    <GameBody />
                    <Footer /> */}
                </ModalProvider>
            </GameStateProvider>
        </FetchedDataProvider>
    )
};


