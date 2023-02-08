import { FC, PropsWithChildren, useReducer } from 'react';

import { QuioskoContext, quioskoReducer } from './';

export interface QuioskoState {
	// variable: boolean;
}

const QUIOSKO_INITIAL_STATE: QuioskoState = {
	// variable: false
};

export const QuioskoProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(quioskoReducer, QUIOSKO_INITIAL_STATE);

	return (
		<QuioskoContext.Provider
			value={{
				// State
				...state

				// Metodos
			}}
		>
			{children}
		</QuioskoContext.Provider>
	);
};
