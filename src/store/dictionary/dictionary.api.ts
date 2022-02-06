import BaseAPI from '@/store/BaseAPI';
import { ExpressionDto } from './dictionary.type';
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

}

export default new DictionaryAPI();
