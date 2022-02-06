export enum DefinitionTextType {
	DESCRIPTION = 0,
	EXAMPLE = 1,
	TAG = 2
};

export type DefinitionTextObj = {
	text: string;
	type: DefinitionTextType;
};

const splitRegex = /({|}|<|>)/;

export function definitionToFormatJson(definition: string) {
	// console.log('_' + definition + '_');
	const result: DefinitionTextObj[] = [];
	const splitted = definition.split(splitRegex);

	let currDefType = DefinitionTextType.DESCRIPTION;
	let currDefText = '';
	for(const part of splitted) {
		switch (part) {
			case '{':
				currDefType = DefinitionTextType.EXAMPLE;
				break;
			case '<':
				currDefType = DefinitionTextType.TAG;
				break;
			case '}': 
			case '>':
				result.push({ text: currDefText, type: currDefType });
				currDefType = DefinitionTextType.DESCRIPTION;
				currDefText = '';
				break;
			default:
				if (currDefType === DefinitionTextType.DESCRIPTION && part.length > 0) {
					result.push({ text: part, type: currDefType });
				} else {
					currDefText += part;
				}
		}
	}
	return result;
}