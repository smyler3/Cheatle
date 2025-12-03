import './App.css';
import Footer from './footer/Footer';
import Header from './header/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import GameBody from './gameBody/GameBody';
import { ModalProvider } from '../hooks/modal/ModalProvider';
import HintProvider from '../hooks/hints/HintProvider';
import { TimerProvider } from '../hooks/timer/TimerProvider';

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <TimerProvider>
                <HintProvider>
                    <ModalProvider>
                        <Header />
                        <GameBody />
                        <Footer />
                    </ModalProvider>
                </HintProvider>
            </TimerProvider>
        </QueryClientProvider>
    )
}
