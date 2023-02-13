import { FC, useContext } from 'react';
import Image from 'next/image';

import { formatear } from '@/helpers';
import { IOrden } from '@/interfaces';
import { QuioskoContext } from '@/context';

interface Props {
	orden: IOrden;
}

export const Orden: FC<Props> = ({ orden }) => {
	const { completarOrden } = useContext(QuioskoContext);
	const { id, nombre, total, pedido } = orden;

	return (
		<div className='border space-y-5 p-10'>
			<h2 className='text-2xl font-bold'>Orden {id}</h2>
			<p className='text-lg'>Cliente: {nombre}</p>

			<div>
				{pedido.map((platillo) => (
					<div
						key={platillo.id}
						className='flex items-center border-b last-of-type:border-0 py-3'
					>
						<div className='w-32'>
							<Image
								src={`/assets/img/${platillo.imagen!}.jpg`}
								width={400}
								height={500}
								alt={`Imagen ${platillo.nombre}`}
							/>
						</div>

						<div className='space-y-2 p-5'>
							<h4 className='text-xl font-bold text-amber-500'>
								{platillo.nombre}
							</h4>
							<p className='text-lg font-bold'>
								Cantidad: {platillo.cantidad}
							</p>
						</div>
					</div>
				))}
			</div>

			<div className='md:flex md:items-center md:justify-between my-10'>
				<p className='text-3xl text-amber-500 font-black mt-5'>
					Total a Pagar:
					{formatear.moneda(total)}
				</p>

				<button
					type='button'
					className='btn bg-indigo-600 hover:bg-indigo-800 mt-4 md:mt-0'
					onClick={() => completarOrden(id)}
				>
					Completar Orden
				</button>
			</div>
		</div>
	);
};
