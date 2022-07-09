import BaseAPI from '@/store/BaseAPI';
import { ExpressionDto, Paginated, Source } from './dictionary.type';
// import { } from './dictionary.types';

class DictionaryAPI extends BaseAPI {

  // TODO: add support from and to lang
  public async search(expression: string, fromLang: string, toLang: string): Promise<ExpressionDto[]> {
    try {
      const response = await this.get("/expression/search", { params: { exp: expression } });
			return response.data;
    } catch (e: any) {
      this.log(e);
      throw e;
    }
  }

  public async searchSuggestions(expression: string): Promise<string[]> {
    try {
      const response = await this.get("/expression/search/suggestions", { params: { exp: expression } });
			return response.data;
    } catch (e: any) {
      this.log(e);
      throw e;
    }
  }

  public async getAllDictionaries(): Promise<Source[]> {
    try {
      const response = await this.get("/source");
			return response.data;
    } catch (e: any) {
      this.log(e);
      throw e;
    }
  }

  // TODO: add support from and to lang
  public async getPaginatedData(params: {
    page: number;
    size: number;
    lang?: string;
    sortBy?: string;
    descending?: boolean;
  }): Promise<Paginated<ExpressionDto>> {
    try {
      const response = await this.get("/expression", { params });
			return response.data;
    } catch (e: any) {
      this.log(e);
      throw e;
    }
  }
  
}

export default new DictionaryAPI();
