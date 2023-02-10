import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import { QuioskoContext, quioskoReducer } from './';

import { ICategoria, IProducto } from '@/interfaces';

export interface QuioskoState {
	categorias: ICategoria[];
	categoriaActual: ICategoria | null;
	productoSelec: IProducto | null;
	modal: boolean;
	pedido: IProducto[];
}

const QUIOSKO_INITIAL_STATE: QuioskoState = {
	categorias: [],
	categoriaActual: null,
	productoSelec: null,
	modal: false,
	pedido: []
};

export const QuioskoProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(quioskoReducer, QUIOSKO_INITIAL_STATE);

	// Hacemos la consulta a la DB
	useEffect(() => {
		const obtenerCategorias = async () => {
			const { data } = await axios.get<ICategoria[]>('/api/categorias');

			dispatch({ type: '[Quiosko] - Obtener Categorias', payload: data });
		};

		obtenerCategorias();
	}, []);

	useEffect(() => {
		dispatch({
			type: '[Quiosko] - Categoria Actual Inicial',
			payload: state.categorias[0]
		});
	}, [state.categorias]);

	/**
	 * Métodos
	 */
	const onCategoria = (categoria: ICategoria) => {
		dispatch({ type: '[Quiosko] - Categoria Actual', payload: categoria });
	};

	const onModal = () => {
		dispatch({ type: '[Quiosko] - Modal' });
	};

	const onProductoModal = (producto: IProducto) => {
		dispatch({ type: '[Quiosko] - Producto Seleccionado', payload: producto });
	};

	const onAgregarPedido = (producto: IProducto, cantidad: number) => {
		const pedido = { ...producto, cantidad };

		if (state.pedido.some((pedidoState) => pedidoState.id === pedido.id)) {
			// Actualizar cantidad del producto (Edicion)
			const pedidoActualizado = state.pedido.map((pedidoState) =>
				pedidoState.id === pedido.id ? pedido : pedidoState
			);

			dispatch({
				type: '[Quiosko] - Actualizar Cantidad Producto',
				payload: pedidoActualizado
			});

			toast.success('Guardado correctamente');
		} else {
			// Si producto no existe lo agrego al State.pedido
			dispatch({ type: '[Quiosko] - Agregar Producto a Pedido', payload: pedido });

			toast.success('Agregado al Pedido');
		}
	};

	const onEliminarProductoPedido = (id: number) => {
		dispatch({ type: '[Quiosko] - Eliminar Producto de Pedido', payload: id });
	};

	return (
		<QuioskoContext.Provider
			value={{
				// State
				...state,

				// Metodos
				onCategoria,
				onModal,
				onProductoModal,
				onAgregarPedido,
				onEliminarProductoPedido
			}}
		>
			{children}
		</QuioskoContext.Provider>
	);
};
