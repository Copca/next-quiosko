import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';

import { BiXCircle } from 'react-icons/bi';

import { QuioskoContext } from '@/context';
import { formatear } from '@/helpers';

import { Contador } from './Contador';

export const ModalProducto = () => {
	const { productoSelec, pedido, onModal, onAgregarPedido } =
		useContext(QuioskoContext);
	const [cantidad, setCantidad] = useState(1);
	const [edicion, setEdicion] = useState(false);

	// Se establece la cantida del Producto seleccionado en Modo edición cuando carga el Modal
	useEffect(() => {
		// Revisamos si el productoSeleccionado (modal actual) ya esta el pedido[]
		if (pedido.some((productoPedido) => productoPedido.id === productoSelec?.id)) {
			const productoEdicion = pedido.find(
				(productoPedido) => productoPedido.id === productoSelec?.id
			);

			setEdicion(true);
			setCantidad(productoEdicion?.cantidad!);
		}
	}, [pedido, productoSelec]);

	const onClickCantidad = (nuevaCantidad: number) => {
		setCantidad(nuevaCantidad);
	};

	if (!productoSelec) return <></>;

	return (
		<div className='md:flex gap-10'>
			<div className='md:w-1/3'>
				<Image
					src={`/assets/img/${productoSelec.imagen}.jpg`}
					width={300}
					height={400}
					alt={`imagen producto ${productoSelec.nombre}`}
				/>
			</div>

			<div className='md:w-2/3'>
				<div className='flex justify-end'>
					<BiXCircle
						className='text-3xl cursor-pointer hover:text-red-300'
						onClick={onModal}
					/>
				</div>

				<h1 className='text-2xl font-bold mt-2'>{productoSelec.nombre}</h1>
				<p className='text-4xl text-amber-500 font-black mt-3'>
					{formatear.moneda(productoSelec.precio)}
				</p>

				<Contador cantidad={cantidad} onCantidad={onClickCantidad} />

				<button
					type='button'
					className='btn bg-indigo-600 hover:bg-indigo-800'
					onClick={() => onAgregarPedido(productoSelec, cantidad)}
				>
					{edicion ? 'Guardar Cambios' : 'Añadir al pedido'}
				</button>
			</div>
		</div>
	);
};
