import { createContext } from 'react';

import { ICategoria, IProducto } from '@/interfaces';

interface ContextProps {
	// State
	categorias: ICategoria[];
	categoriaActual: ICategoria | null;
	productoSelec: IProducto | null;
	modal: boolean;
	pedido: IProducto[];

	// Metodos
	onCategoria: (categoria: ICategoria) => void;
	onModal: () => void;
	onProductoModal: (producto: IProducto) => void;
	onAgregarPedido: (producto: IProducto, cantidad: number) => void;
}

export const QuioskoContext = createContext({} as ContextProps);
