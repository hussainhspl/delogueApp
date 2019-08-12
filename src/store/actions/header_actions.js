// export const STYLE_TAB = 'STYLE_TA

import {SEARCH, MESSAGE, STYLE} from './action_types';

export const searchButton = () => {
	return {
		type: SEARCH
	};
}

export const messageButton = () => {
	return {
		type: MESSAGE
	};
}

export const styleButton = () => {
	return {
		type: STYLE
	};
}

