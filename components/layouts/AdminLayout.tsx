import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { ToastContainer } from 'react-toastify';

interface Props {
	pagina: string;
}

export const AdminLayout: FC<PropsWithChildren<Props>> = ({ children, pagina }) => {
	return (
		<>
			<Head>
				<title>Café - {pagina}</title>
				<meta name='description' content='Quosco Cafetería' />
			</Head>

			<div className='md:flex'>
				<aside className='md:w-1/3 xl:w-1/4 2xl:w-1/5 py-5'>
					<Image
						width={100}
						height={80}
						src='/assets/img/logo.svg'
						alt='imagen logotipo'
						priority
						className='mx-auto w-4/5'
					/>
				</aside>

				<main className='md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll'>
					<div className='p-10'>{children}</div>
				</main>
			</div>
			<ToastContainer />
		</>
	);
};
