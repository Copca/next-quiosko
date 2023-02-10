import { useContext } from 'react';
import { NextPage } from 'next';

import { QuioskoContext } from '@/context';

import { Layout } from '@/components/layouts';
import { ResumenProducto } from '@/components/ui';

const ResumenPage: NextPage = () => {
	const { pedido } = useContext(QuioskoContext);

	return (
		<Layout pagina={'Resumen'}>
			<h1 className='text-3xl font-black'>Resumen</h1>
			<p className='text-xl my-8'>Revisa tu Pedido</p>

			{pedido.length === 0 ? (
				<p className='text-xl text-center'>NO hay elementos en tu pedido</p>
			) : (
				pedido.map((productoPedido) => (
					<ResumenProducto key={productoPedido.id} producto={productoPedido} />
				))
			)}
		</Layout>
	);
};

export default ResumenPage;
