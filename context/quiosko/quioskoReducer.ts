import { QuioskoState } from './';

import { ICategoria, IPedido, IProducto } from '@/interfaces';

type QuioskoActionType =
	| { type: '[Quiosko] - Obtener Categorias'; payload: ICategoria[] }
	| { type: '[Quiosko] - Categoria Actual'; payload: ICategoria }
	| { type: '[Quiosko] - Producto Seleccionado Modal'; payload: IProducto }
	| { type: '[Quiosko] - Cerrar Modal' }
	| { type: '[Quiosko] - Actualizar Cantidad'; payload: number }
	| { type: '[Quiosko] - Actualizar Cantidad Edicion'; payload: number }
	| { type: '[Quiosko] - Agregar Producto a Pedido'; payload: IPedido }
	| { type: '[Quiosko] - Editar Producto'; payload: IPedido }
	| { type: '[Quiosko] - Eliminar Producto de Pedido'; payload: number }
	| { type: '[Quiosko] - Total a Pagar'; payload: number };

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

		case '[Quiosko] - Categoria Actual':
			return {
				...state,
				categoriaActual: action.payload
			};

		case '[Quiosko] - Producto Seleccionado Modal':
			return {
				...state,
				productoSelec: action.payload,
				modal: true
			};

		case '[Quiosko] - Cerrar Modal':
			return {
				...state,
				modal: false,
				productoSelec: null,
				cantidad: 1,
				edicion: false
			};

		case '[Quiosko] - Actualizar Cantidad':
			return {
				...state,
				cantidad: action.payload
			};

		case '[Quiosko] - Actualizar Cantidad Edicion':
			return {
				...state,
				cantidad: action.payload,
				edicion: true
			};

		case '[Quiosko] - Agregar Producto a Pedido':
			return {
				...state,
				pedido: [...state.pedido, action.payload],
				modal: false,
				productoSelec: null,
				cantidad: 1,
				edicion: false
			};

		case '[Quiosko] - Editar Producto':
			return {
				...state,
				pedido: state.pedido.map((productoState) =>
					productoState.id === action.payload.id
						? action.payload
						: productoState
				),
				modal: false,
				productoSelec: null,
				cantidad: 1
			};

		case '[Quiosko] - Eliminar Producto de Pedido':
			return {
				...state,
				pedido: state.pedido.filter(
					(productoPedido) => productoPedido.id !== action.payload
				)
			};

		case '[Quiosko] - Total a Pagar':
			return {
				...state,
				total: action.payload
			};

		default:
			return state;
	}
};
