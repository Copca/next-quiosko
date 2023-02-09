import { useContext } from 'react';
import { NextPage } from 'next';

import { QuioskoContext } from '../context/quiosko/QuioskoContext';
import { ICategoria } from '../interfaces/categorias';

import { Layout } from '@/components/layouts';
import { Producto } from '@/components/ui';

interface Props {
	categorias: ICategoria[];
}

const HomePage: NextPage<Props> = () => {
	const { categoriaActual } = useContext(QuioskoContext);

	return (
		<Layout pagina={`Menú ${categoriaActual?.nombre}`}>
			<h1 className='text-3xl font-black'>{categoriaActual?.nombre}</h1>

			<p className='text-xl my-8'>Elige y personaliza tu pedido a continuación</p>

			<div className='grid gap-4 grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
				{categoriaActual?.productos?.map((producto) => (
					<Producto key={producto.id} producto={producto} />
				))}
			</div>
		</Layout>
	);
};

export default HomePage;
