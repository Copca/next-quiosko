import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import { QuioskoContext, quioskoReducer } from './';

import { ICategoria, IPedido, IProducto } from '@/interfaces';

export interface QuioskoState {
	categorias: ICategoria[];
	categoriaActual: ICategoria | null;
	productoSelec: IProducto | null;
	modal: boolean;
	pedido: IPedido[];
	cantidad: number;
	edicion: boolean;
}

const QUIOSKO_INITIAL_STATE: QuioskoState = {
	categorias: [],
	categoriaActual: null,
	productoSelec: null,
	modal: false,
	pedido: [],
	cantidad: 1,
	edicion: false
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

	// Establecemos una categoría por default al cargar despues de hacer la peticion api
	useEffect(() => {
		dispatch({
			type: '[Quiosko] - Categoria Actual',
			payload: state.categorias[0]
		});
	}, [state.categorias]);

	// Obtenemos la cantidad del Producto si este ya esta en el Pedido (Edición)
	useEffect(() => {
		if (
			state.pedido.some(
				(productoPedido) => productoPedido.id === state.productoSelec?.id
			)
		) {
			const cantidaEdicion = state.pedido.find(
				(productoPedido) => productoPedido.id === state.productoSelec?.id
			)?.cantidad!;

			dispatch({
				type: '[Quiosko] - Actualizar Cantidad Edicion',
				payload: cantidaEdicion
			});
		}
	}, [state.productoSelec, state.pedido]);

	/**
	 * Métodos
	 */
	const onCategoria = (categoria: ICategoria) => {
		dispatch({ type: '[Quiosko] - Categoria Actual', payload: categoria });
	};

	const onProductoModal = (producto: IProducto) => {
		dispatch({ type: '[Quiosko] - Producto Seleccionado Modal', payload: producto });
	};

	const onCerrarModal = () => {
		dispatch({ type: '[Quiosko] - Cerrar Modal' });
	};

	const onActualizaCantidad = (cantidad: number) => {
		dispatch({ type: '[Quiosko] - Actualizar Cantidad', payload: cantidad });
	};

	const onAgregarPedido = (producto: IProducto) => {
		const productoPedido = { ...producto, cantidad: state.cantidad };

		// Redisar si el producto existe ya en pedido editarlo
		if (
			state.pedido.some((productoState) => productoState.id === productoPedido.id) // return true/false
		) {
			// Si existe Editar Producto
			dispatch({ type: '[Quiosko] - Editar Producto', payload: productoPedido });

			toast.success('Guardado correctamente');
		} else {
			// Producto Nuevo Agrear a pedido
			dispatch({
				type: '[Quiosko] - Agregar Producto a Pedido',
				payload: productoPedido
			});

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
				onCerrarModal,
				onProductoModal,
				onActualizaCantidad,
				onAgregarPedido,
				onEliminarProductoPedido
			}}
		>
			{children}
		</QuioskoContext.Provider>
	);
};
