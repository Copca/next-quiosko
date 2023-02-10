import { useRouter } from 'next/router';

const pasos = [
	{ paso: 1, nombre: 'Menú', url: '/' },
	{ paso: 2, nombre: 'Resumen', url: '/resumen' },
	{ paso: 3, nombre: 'Datos y Total', url: '/total' }
];

export const Pasos = () => {
	const router = useRouter();

	const calcularProgeso = () => {
		let valor;

		switch (router.pathname) {
			case '/':
				valor = 2;
				break;

			case '/resumen':
				valor = 50;
				break;

			case '/total':
				valor = 100;
				break;

			default:
				break;
		}

		return valor;
	};

	return (
		<>
			<div className='flex justify-between mb-4'>
				{pasos.map((paso) => (
					<button
						type='button'
						key={paso.paso}
						className='text-xl font-bold'
						onClick={() => router.push(`${paso.url}`)}
					>
						{paso.nombre}
					</button>
				))}
			</div>

			<div className='bg-gray-100 mb-10'>
				<div
					className='text-white text-sm text-center leading-none bg-amber-500 rounded-full h-2 transition-all duration-1000'
					style={{ width: `${calcularProgeso()}%` }}
				></div>
			</div>
		</>
	);
};
