import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';

import { QuioskoContext, quioskoReducer } from './';

import { ICategoria, IOrden, IPedido, IProducto } from '@/interfaces';

export interface QuioskoState {
	categorias: ICategoria[];
	categoriaActual: ICategoria | null;
	productoSelec: IProducto | null;
	modal: boolean;
	pedido: IPedido[];
	cantidad: number;
	edicion: boolean;
	total: number;
}

const QUIOSKO_INITIAL_STATE: QuioskoState = {
	categorias: [],
	categoriaActual: null,
	productoSelec: null,
	modal: false,
	pedido: [],
	cantidad: 1,
	edicion: false,
	total: 0
};

export const QuioskoProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(quioskoReducer, QUIOSKO_INITIAL_STATE);
	const router = useRouter();

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

	// Calculamos el total a pagar del pedido
	useEffect(() => {
		const total = state.pedido.reduce(
			(prev, current) => current.precio * current.cantidad + prev,
			0
		);

		dispatch({ type: '[Quiosko] - Total a Pagar', payload: total });
	}, [state.pedido]);

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
		const productoPedido = { ...producto, cantidad: state.cantidad }; // Agregamos la cantidad

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

	const enviarOrden = async (nombre: string) => {
		try {
			await axios.post('/api/ordenes', {
				nombre,
				fecha: Date.now().toString(),
				total: state.total,
				pedido: state.pedido
			});

			dispatch({ type: '[Quiosko] - Reset State' });

			toast.success('Pedido enviado');

			setTimeout(() => {
				router.push('/');
			}, 3000);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.log(error.response?.data.message);
			}
		}
	};

	const completarOrden = async (ordenId: number) => {
		try {
			await axios.post(`/api/ordenes/${ordenId}`);

			toast.success('Orden Lista');
		} catch (error) {
			console.log(error);
			toast.error('Hubo un error');
		}
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
				onEliminarProductoPedido,
				enviarOrden,
				completarOrden
			}}
		>
			{children}
		</QuioskoContext.Provider>
	);
};
