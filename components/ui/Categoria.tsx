import { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { QuioskoContext } from '@/context';
import { ICategoria } from '@/interfaces';

interface Props {
	categoria: ICategoria;
}

export const Categoria: FC<Props> = ({ categoria }) => {
	const { categoriaActual, onCategoria } = useContext(QuioskoContext);
	const router = useRouter();

	const { id, nombre, icono } = categoria;

	return (
		<button
			type='button'
			className={`text-2xl font-bold border hover:bg-amber-400 hover:cursor-pointer w-full ${
				categoriaActual?.id === id && 'bg-amber-400'
			}`}
			onClick={() => {
				onCategoria(categoria);
				router.push('/');
			}}
		>
			<div className='flex items-center gap-4 p-5'>
				<Image
					src={`/assets/img/icono_${icono}.svg`}
					width='50'
					height='50'
					alt='Imagen Icono'
					priority
					className='w-10 h-10'
				/>

				{nombre}
			</div>
		</button>
	);
};
