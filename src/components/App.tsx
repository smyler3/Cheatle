import './App.css';
import Footer from './footer/Footer';
import Header from './header/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import GameBody from './gameBody/GameBody';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalPortal from './modalPortal/ModalPortal';

const queryClient = new QueryClient();

export default function App () {
    const [modalInfo, setModalInfo] = useState<{ shouldShowModal: boolean, modalToShow: string | null}>({ shouldShowModal: true, modalToShow: "infoModal" });

    const closeModal = () => {
        setModalInfo({ shouldShowModal: false, modalToShow: null });
    };

    return (
        <QueryClientProvider client={queryClient}>
            {createPortal(
                <ModalPortal
                    modalInfo={modalInfo} 
                    handleCloseModal={closeModal}
                />,
                document.body
            )}
            <Header />
            <GameBody />
            <Footer />
        </QueryClientProvider>
    )
}
