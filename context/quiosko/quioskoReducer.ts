import { QuioskoState } from './';

import { ICategoria, IProducto } from '@/interfaces';

type QuioskoActionType =
	| { type: '[Quiosko] - Obtener Categorias'; payload: ICategoria[] }
	| { type: '[Quiosko] - Categoria Actual Inicial'; payload: ICategoria }
	| { type: '[Quiosko] - Categoria Actual'; payload: ICategoria }
	| { type: '[Quiosko] - Producto Seleccionado'; payload: IProducto }
	| { type: '[Quiosko] - Modal' }
	| { type: '[Quiosko] - Agregar Producto a Pedido'; payload: IProducto }
	| { type: '[Quiosko] - Actualizar Cantidad Producto'; payload: IProducto[] }
	| { type: '[Quiosko] - Eliminar Producto de Pedido'; payload: number };

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
				pedido: action.payload,
				productoSelec: null
			};

		case '[Quiosko] - Eliminar Producto de Pedido':
			return {
				...state,
				pedido: state.pedido.filter(
					(productoPedido) => productoPedido.id !== action.payload
				)
			};

		default:
			return state;
	}
};
