/**
 * Prisma solo corre en el Servidor (backend)
 */

import { GetServerSideProps, NextPage } from 'next';
import { PrismaClient } from '@prisma/client';

import { ICategoria } from '../interfaces/categorias';
import { Layout } from '@/components/layouts';

interface Props {
	categorias: ICategoria[];
}

const HomePage: NextPage<Props> = ({ categorias }) => {
	return <Layout pagina={'Inicio'}>HomePage</Layout>;
};

export default HomePage;
