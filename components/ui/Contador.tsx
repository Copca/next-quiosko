import { FC } from 'react';
import { BiMinusCircle, BiPlusCircle } from 'react-icons/bi';

interface Props {
	cantidad: number;
	onCantidad: (cantidad: number) => void;
}

export const Contador: FC<Props> = ({ cantidad, onCantidad }) => {
	const onClickCantidad = (nuevaCantidad: number) => {
		if (nuevaCantidad < 1 || nuevaCantidad > 10) return;

		onCantidad(nuevaCantidad);
	};

	return (
		<div className='flex items-center text-2xl text-slate-700 space-x-2 my-4'>
			<BiMinusCircle
				className='text-3xl cursor-pointer hover:text-indigo-600'
				onClick={() => onClickCantidad(cantidad - 1)}
			/>
			<p className='w-8 text-center'>{cantidad}</p>
			<BiPlusCircle
				className='text-3xl cursor-pointer hover:text-indigo-600'
				onClick={() => onClickCantidad(cantidad + 1)}
			/>
		</div>
	);
};
