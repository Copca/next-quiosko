import { createContext } from 'react';

import { ICategoria, IPedido, IProducto } from '@/interfaces';

interface ContextProps {
	// State
	categorias: ICategoria[];
	categoriaActual: ICategoria | null;
	productoSelec: IProducto | null;
	modal: boolean;
	pedido: IPedido[];
	cantidad: number;
	edicion: boolean;
	total: number;

	// Metodos
	onCategoria: (categoria: ICategoria) => void;
	onCerrarModal: () => void;
	onProductoModal: (producto: IProducto) => void;
	onActualizaCantidad: (cantidad: number) => void;
	onAgregarPedido: (producto: IProducto, cantidad: number) => void;
	onEliminarProductoPedido: (id: number) => void;
	enviarOrden: (cliente: string) => Promise<void>;
	completarOrden: (orden: number) => void;
}

export const QuioskoContext = createContext({} as ContextProps);
