import { IProducto } from './productos';

export interface ICategoria {
	id: number;
	icono: string;
	nombre: string;
	productos?: IProducto[];
}
