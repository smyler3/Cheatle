import './App.css';
import Footer from './footer/Footer';
import Header from './header/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import GameBody from './gameBody/GameBody';
import { Activity, useState } from 'react';
import InfoModal from './infoModal/InfoModal';

const queryClient = new QueryClient();

export default function App () {
    const [showModal, setShowModal] = useState(false);

    return (
        <QueryClientProvider client={queryClient}>
            <Activity mode={showInfoModal ? "visible" : "hidden"}>
                <InfoModal></InfoModal>
            </Activity>
            <Activity mode={showHintModal ? "visible" : "hidden"}>
                <HintModal></HintModal>
            </Activity>
            <Header />
            <GameBody />
            <Footer />
        </QueryClientProvider>
    )
}
