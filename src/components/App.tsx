import './App.css';
import Footer from './footer/Footer';
import Header from './header/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import GameBody from './gameBody/GameBody';
import { ModalProvider } from '../hooks/modal/ModalProvider';

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ModalProvider>
                <Header />
                <GameBody />
                <Footer />
            </ModalProvider>
        </QueryClientProvider>
    )
}
