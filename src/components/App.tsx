import './App.css';
import Footer from './footer/Footer';
import Header from './header/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import GameBody from './gameBody/GameBody';
import { ModalProvider } from '../hooks/modal/ModalProvider';
import HintProvider from '../hooks/hints/HintProvider';

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <HintProvider>
                <ModalProvider>
                    <Header />
                    <GameBody />
                    <Footer />
                </ModalProvider>
            </HintProvider>
        </QueryClientProvider>
    )
}
