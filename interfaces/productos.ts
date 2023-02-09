import { ICategoria } from './categorias';

export interface IProducto {
	id: number;
	nombre: string;
	precio: number;
	imagen: string;
	categoriaId: number;
	categoria?: ICategoria;
}

export interface IPedido {
	id: number;
	nombre: string;
	precio: number;
	cantidad: number;
}
