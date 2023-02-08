/**
 * Prisma solo corre en el Servidor (backend)
 */

import { GetServerSideProps, NextPage } from 'next';
import { PrismaClient } from '@prisma/client';

import { ICategoria } from '../interfaces/categorias';

interface Props {
	categorias: ICategoria[];
}

const HomePage: NextPage<Props> = ({ categorias }) => {
	return <div className='bg-red-500'>HomePage</div>;
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const prisma = new PrismaClient();

	const categorias = await prisma.categoria.findMany();

	return {
		props: {
			categorias
		}
	};
};

export default HomePage;
