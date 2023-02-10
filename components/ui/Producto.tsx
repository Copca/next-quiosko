import { FC, useContext } from 'react';
import Image from 'next/image';

import { QuioskoContext } from '@/context';
import { IProducto } from '@/interfaces';
import { formatear } from '@/helpers';

interface Props {
	producto: IProducto;
}

export const Producto: FC<Props> = ({ producto }) => {
	const { onProductoModal, onModal } = useContext(QuioskoContext);
	const { id, imagen, nombre, precio } = producto;

	return (
		<div className='border p-3'>
			<Image
				src={`/assets/img/${imagen}.jpg`}
				width={400}
				height={500}
				alt={`imagen ${nombre}`}
			/>

			<div className='p-5'>
				<h3 className='text-xl font-bold'>{nombre}</h3>
				<p className='text-3xl font-bold text-amber-500 my-5'>
					{formatear.moneda(precio)}
				</p>

				<button
					type='button'
					className='btn bg-indigo-600 hover:bg-indigo-800 w-full'
					onClick={() => onProductoModal(producto)}
				>
					Agregar
				</button>
			</div>
		</div>
	);
};
