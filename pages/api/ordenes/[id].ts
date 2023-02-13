import type { NextApiRequest, NextApiResponse } from 'next';
import { Orden, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Data = { message: string } | Orden;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'POST':
			return completarOrden(req, res);

		default:
			return res.status(400).json({ message: 'Bad Request' });
	}
}

const completarOrden = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { id } = req.query as { id: string };

	const ordenActualizada = await prisma.orden.update({
		where: {
			id: parseInt(id)
		},
		data: {
			estado: true
		}
	});

	return res.status(200).json(ordenActualizada);
};
