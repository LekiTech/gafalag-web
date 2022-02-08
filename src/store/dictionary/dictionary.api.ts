import BaseAPI from '@/store/BaseAPI';
import { ExpressionDto, Source } from './dictionary.type';
// import { } from './dictionary.types';

class DictionaryAPI extends BaseAPI {

  public async search(expression: string): Promise<ExpressionDto[]> {
    try {
      const response = await this.get("/expression/search", { params: { exp: expression } });
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
}

export default new DictionaryAPI();
