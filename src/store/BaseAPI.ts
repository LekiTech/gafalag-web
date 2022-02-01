import axios from 'axios';

interface Options {
  [key: string]: object;
}

export default class BaseAPI {
  private baseUrl: string | undefined;
  private logEnabled = true;
  private headers: Record<string, any> = {};


  constructor() {
    this.baseUrl = process.env.API_URL;

    this.log('[API] initialized with url: ' + this.baseUrl);
    this.log('[API] mode: ' + process.env.NODE_ENV);
  }

  protected log(...payload: string[]): void {
    if (this.logEnabled) {
      console.log(...payload)
    }
  }

  protected createUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }

  protected get(url: string, options?: Options) {
    return axios.get(this.createUrl(url), this.mergeOptions(options));
  }

  protected post(url: string, body: object, options?: Options) {
    return axios.post(this.createUrl(url), body, this.mergeOptions(options));
  }

  protected put(url: string, body: object, options?: Options) {
    return axios.put(this.createUrl(url), body, this.mergeOptions(options));
  }

  protected patch(url: string, body: object, options?: Options) {
    return axios.patch(this.createUrl(url), body, this.mergeOptions(options));
  }

  private mergeOptions(options?: { [key: string]: object }) {
    return {
      ...options,
      headers: options ? {
        ...this.headers,
        ...options.headers
      } : this.headers
    }
  }

  protected delete(url: string, body: object, options?: Options) {
    const axiosOptions = this.mergeOptions(options);
    return axios({
      ...axiosOptions,
      method: 'delete',
      url: this.createUrl(url),
      data: body
    });
  }
}
