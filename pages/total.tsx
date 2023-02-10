import { NextPage } from 'next';

import { Layout } from '@/components/layouts';

const TotalPage: NextPage = () => {
	return (
		<Layout pagina='Total y Confirmar Pedido'>
			<h1 className='text-3xl font-black'>Total y Confirmar Pedido</h1>
			<p className='text-xl my-8'>Confirma tu Pedido a Continuación</p>
		</Layout>
	);
};

export default TotalPage;
