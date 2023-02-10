import { FC, useContext } from 'react';
import Image from 'next/image';

import { FaRegTrashAlt, FaEdit } from 'react-icons/fa';

import { QuioskoContext } from '@/context';
import { formatear } from '@/helpers';
import { IProducto } from '@/interfaces';

interface Props {
	producto: IProducto;
}

export const ResumenProducto: FC<Props> = ({ producto }) => {
	console.log(producto);
	const { onModal, onProductoModal } = useContext(QuioskoContext);

	return (
		<div className='flex items-center gap-10 shadow p-5 mb-3'>
			<div className='md:w-1/6'>
				<Image
					src={`/assets/img/${producto.imagen}.jpg`}
					width={300}
					height={400}
					alt={`Imagen producto ${producto.nombre}`}
				/>
			</div>

			<div className='md:w-4/6'>
				<p className='text-2xl font-bold'>{producto.nombre}</p>
				<p className='text-xl mt-2'>Cantidad: {producto.cantidad}</p>
				<p className='text-xl text-amber-500 font-bold mt-2'>
					Precio: {formatear.moneda(producto.precio)}
				</p>
				<p className='text-slate-700 font-bold mt-2'>
					Subtotal: {formatear.moneda(producto.precio * producto.cantidad!)}
				</p>
			</div>

			<div className='flex flex-col gap-4 md:w-1/6'>
				<button
					type='button'
					className='btn bg-sky-700 hover:bg-sky-800'
					onClick={() => {
						onModal();
						onProductoModal(producto);
					}}
				>
					<FaEdit className='mr-2' />
					Editar
				</button>

				<button type='button' className='btn bg-red-500 hover:bg-red-600'>
					<FaRegTrashAlt className='mr-2' />
					Eliminar
				</button>
			</div>
		</div>
	);
};
