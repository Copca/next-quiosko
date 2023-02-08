import Head from 'next/head';
import { FC, PropsWithChildren } from 'react';
import { Sidebar } from '../ui';

interface Props {
	pagina: string;
}

export const Layout: FC<PropsWithChildren<Props>> = ({ children, pagina }) => {
	return (
		<>
			<Head>
				<title>Cáfe - {pagina}</title>
				<meta name='Descripción' content='Quiosko Cafetería' />
			</Head>

			<div className='md:flex'>
				<aside className='md:w-1/3 xl:w-1/4 2xl:w-1/5'>
					<Sidebar />
				</aside>

				<main className='md:w-2/3 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-auto'>
					{children}
				</main>
			</div>
		</>
	);
};
