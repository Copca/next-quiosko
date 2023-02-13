import type { NextApiRequest, NextApiResponse } from 'next';
import { Orden, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Data = { message: string } | Orden | Orden[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'POST':
			return crearOrden(req, res);

		case 'GET':
			return obtenerOrdenes(req, res);

		default:
			return res.status(400).json({ message: 'Bad Request' });
	}
}

// POST /api/ordenes
const crearOrden = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { nombre, fecha, total, pedido } = req.body;

	const orden = await prisma.orden.create({
		data: { nombre, fecha, total, pedido }
	});

	return res.status(200).json(orden);
};

// GET /api/ordenes
const obtenerOrdenes = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const ordenes = await prisma.orden.findMany();

	return res.status(200).json(ordenes);
};
