import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import DataWrapper from './DataWrapper';

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <DataWrapper />
        </QueryClientProvider>
    )
}


