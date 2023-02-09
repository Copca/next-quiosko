import { useContext } from 'react';
import Image from 'next/image';

import { QuioskoContext } from '@/context/quiosko/';
import { Categoria } from './Categoria';

export const Sidebar = () => {
	const { categorias } = useContext(QuioskoContext);

	return (
		<>
			<Image
				width={100}
				height={80}
				src='/assets/img/logo.svg'
				alt='imagen logo'
				priority
				className='w-28 h-auto mx-auto'
			/>

			<nav className='mt-10'>
				{categorias.map((categoria) => (
					<Categoria key={categoria.id} categoria={categoria} />
				))}
			</nav>
		</>
	);
};
