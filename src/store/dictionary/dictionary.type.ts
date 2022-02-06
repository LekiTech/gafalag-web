export type ExpressionDto = {
	id: string;
	spelling: string;
	inflection: string;
	languageId: string;
	definitions: Definition[];
};

export type Definition = {
	text: string;
	languageId: string;
	sourceId: string;
};
