import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

export abstract class BaseIntegration {
  protected client: AxiosInstance;
  protected serviceName: string;

  constructor(serviceName: string, baseURL: string) {
    this.serviceName = serviceName;
    this.client = axios.create({
      baseURL,
      timeout: 5000,
    });
  }

  protected async call<T>(config: AxiosRequestConfig): Promise<T | null> {
    try {
      const response = await this.client.request<T>(config);
      return response.data;
    } catch (error: any) {
      console.warn(`[${this.serviceName}] Integration call failed: ${error.message}`);
      return null;
    }
  }
}
