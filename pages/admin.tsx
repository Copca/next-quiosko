import { NextPage } from 'next';
import useSWR from 'swr';

import { IOrden } from '@/interfaces';

import { AdminLayout } from '@/components/layouts';
import { Orden } from '@/components/ui';

const AdminPage: NextPage = () => {
	const { data, error, isLoading } = useSWR<IOrden[]>('/api/ordenes', {
		refreshInterval: 100
	});

	if (!error && !data) return <></>;

	return (
		<AdminLayout pagina={'Admin'}>
			<h1 className='text-3xl font-black'>Panel de Administración</h1>
			<p className='text-xl my-8'>Administra las Ordenes</p>

			{data?.length ? (
				data.map((orden) => <Orden key={orden.id} orden={orden} />)
			) : (
				<p>No hay ordenes pendientes</p>
			)}
		</AdminLayout>
	);
};

export default AdminPage;
