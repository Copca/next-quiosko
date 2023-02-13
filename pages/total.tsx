import { FormEvent, useContext, useEffect, useCallback, useState } from 'react';
import { NextPage } from 'next';

import { QuioskoContext } from '@/context';

import { Layout } from '@/components/layouts';
import { formatear } from '@/helpers';

const TotalPage: NextPage = () => {
	const { pedido, total, enviarOrden } = useContext(QuioskoContext);
	const [nombre, setNombre] = useState('');

	// Se usa useCallback para evitar errores de multiples renderizados
	// Habilitar boton submit disable=true/false
	const btnDeshabilitado = useCallback(
		() => pedido.length === 0 || [nombre.trim()].includes('') || nombre.length < 3,
		[pedido, nombre]
	); // retorna true/false

	useEffect(() => {
		btnDeshabilitado();
	}, [pedido, btnDeshabilitado]);

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		enviarOrden(nombre);
	};

	return (
		<Layout pagina='Total y Confirmar Pedido'>
			<h1 className='text-3xl font-black'>Total y Confirmar Pedido</h1>
			<p className='text-xl my-8'>Confirma tu Pedido a Continuación</p>

			<div>
				<form onSubmit={onSubmit}>
					<div className='mb-4'>
						<label
							className='block text-slate-800 text-sm font-bold uppercase'
							htmlFor='nombre'
						>
							Nombre
						</label>
						<input
							type='text'
							id='nombre'
							className='bg-gray-200 rounded w-full lg:w-1/2 mt-1 p-2'
							value={nombre}
							onChange={({ target }) => setNombre(target.value)}
						/>
					</div>

					<div className='mb-4'>
						<p className='text-2xl mb-4'>
							Total a Pagar:{' '}
							<span className='font-bold'>{formatear.moneda(total)}</span>{' '}
						</p>

						<input
							type='submit'
							className='btn bg-indigo-600 hover:bg-indigo-800 w-full lg:w-auto disabled:cursor-not-allowed disabled:opacity-50'
							value={'Confirmar Pedido'}
							disabled={btnDeshabilitado()}
						/>
					</div>
				</form>
			</div>
		</Layout>
	);
};

export default TotalPage;
