import { Language } from "@/store/app/app.enum";

export type DictionaryReduxState = {
	sources?: Record<string, Source>;
  fromLang: Language,
  toLang: Language,
}

export type Source = {
	id: string;
	name: string;
	url?: string;
	createdAt: string;
}

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

export type Paginated<T> = {
	totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  items: T[];
}