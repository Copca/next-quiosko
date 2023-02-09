import { QuioskoState } from './';

import { ICategoria, IPedido, IProducto } from '@/interfaces';

type QuioskoActionType =
	| { type: '[Quiosko] - Obtener Categorias'; payload: ICategoria[] }
	| { type: '[Quiosko] - Categoria Actual Inicial'; payload: ICategoria }
	| { type: '[Quiosko] - Categoria Actual'; payload: ICategoria }
	| { type: '[Quiosko] - Producto Seleccionado'; payload: IProducto }
	| { type: '[Quiosko] - Modal' }
	| { type: '[Quiosko] - Agregar Producto a Pedido'; payload: IPedido }
	| { type: '[Quiosko] - Actualizar Cantidad Producto'; payload: IPedido[] };

export const quioskoReducer = (
	state: QuioskoState,
	action: QuioskoActionType
): QuioskoState => {
	switch (action.type) {
		case '[Quiosko] - Obtener Categorias':
			return {
				...state,
				categorias: action.payload
			};

		case '[Quiosko] - Categoria Actual Inicial':
			return {
				...state,
				categoriaActual: action.payload
			};

		case '[Quiosko] - Categoria Actual Inicial':
		case '[Quiosko] - Categoria Actual':
			return {
				...state,
				categoriaActual: action.payload
			};

		case '[Quiosko] - Producto Seleccionado':
			return {
				...state,
				productoSelec: action.payload
			};

		case '[Quiosko] - Modal':
			return {
				...state,
				modal: !state.modal,
				productoSelec: state.modal ? null : state.productoSelec
			};

		case '[Quiosko] - Agregar Producto a Pedido':
			return {
				...state,
				modal: !state.modal,
				pedido: [...state.pedido, action.payload],
				productoSelec: null
			};

		case '[Quiosko] - Actualizar Cantidad Producto':
			return {
				...state,
				modal: !state.modal,
				pedido: action.payload
			};

		default:
			return state;
	}
};
