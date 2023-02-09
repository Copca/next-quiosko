import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

import { ICategoria } from '@/interfaces';

const prisma = new PrismaClient();

type Data = { name: string } | ICategoria[];

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const categorias = await prisma.categoria.findMany({
		include: {
			productos: true
		}
	});

	res.status(200).json(categorias);
}
