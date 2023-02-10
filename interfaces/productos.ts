import { ICategoria } from './categorias';

export interface IProducto {
	id: number;
	nombre: string;
	precio: number;
	imagen: string;
	categoriaId: number;
	categoria?: ICategoria;

	cantidad?: number;
}
