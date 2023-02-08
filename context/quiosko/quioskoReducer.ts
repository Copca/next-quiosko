import { QuioskoState } from './';

type QuioskoActionType =
	| { type: '[Quiosko] - Action Name' }
	| { type: '[Quiosko] - Action Name' };

export const quioskoReducer = (
	state: QuioskoState,
	action: QuioskoActionType
): QuioskoState => {
	switch (action.type) {
		case '[Quiosko] - Action Name':
			return {
				...state,
				menu: true
			};

		default:
			return state;
	}
};
