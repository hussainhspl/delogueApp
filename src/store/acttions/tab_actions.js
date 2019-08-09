import {GENERAL, COMMENTS, FILES, SAMPLE, PDF} from './action_types';

export const generalTab = () => {
	return {
		type: GENERAL
	};
}

export const commentTab = () => {
	return {
		type: COMMENTS
	};
}

export const filesTab = () => {
	return {
		type: FILES
	};
}

export const sampleTab = () => {
	return {
		type: SAMPLE
	};
}

export const pdfTab = () => {
	return {
		type: PDF
	};
}