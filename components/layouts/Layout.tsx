import { FC, PropsWithChildren, useContext } from 'react';
import Head from 'next/head';
import Modal from 'react-modal';
import { ToastContainer } from 'react-toastify';

import { QuioskoContext } from '@/context';

import { ModalProducto, Sidebar } from '../ui';

interface Props {
	pagina: string;
}

Modal.setAppElement('#__next');

export const Layout: FC<PropsWithChildren<Props>> = ({ children, pagina }) => {
	const { modal, onModal } = useContext(QuioskoContext);

	return (
		<>
			<Head>
				<title>Cáfe - {pagina}</title>
				<meta name='Descripción' content='Quiosko Cafetería' />
			</Head>

			<div className={modal ? 'blur-sm' : ''}>
				<div className='md:flex'>
					<aside className='md:w-1/3 xl:w-1/4 2xl:w-1/5'>
						<Sidebar />
					</aside>

					<main className='md:w-2/3 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-auto'>
						<div className='p-10'>{children}</div>
					</main>
				</div>
			</div>

			<Modal
				isOpen={modal}
				shouldCloseOnOverlayClick={true}
				onRequestClose={onModal}
				className='absolute bg-white shadow border p-4 top-1/2 left-1/2 right-auto bottom-auto -translate-x-1/2 -translate-y-1/2 animate-fadeIn'
			>
				<ModalProducto />
			</Modal>

			<ToastContainer />
		</>
	);
};
