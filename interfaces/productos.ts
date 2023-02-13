import { ICategoria } from './categorias';

export interface IProducto {
	id: number;
	nombre: string;
	precio: number;
	imagen?: string;
	categoriaId: number;
	categoria?: ICategoria;
}

export interface IPedido extends IProducto {
	cantidad: number;
}

export interface IOrden {
	id: number;
	nombre: string;
	fecha: string;
	total: number;
	pedido: IPedido[];
	estado: boolean;
}
