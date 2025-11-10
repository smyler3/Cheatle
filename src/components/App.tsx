import './App.css';
import Footer from './footer/Footer';
import Header from './header/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import GameBody from './gameBody/GameBody';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Header />
            <GameBody />
            <Footer />
        </QueryClientProvider>
    )
}

export default App
