import axios from 'axios';

export class PythonBridge {
  private static readonly PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || 'http://localhost:5000';

  public static async callForensicService(endpoint: string, data: any) {
    try {
      const response = await axios.post(`${this.PYTHON_SERVICE_URL}${endpoint}`, data);
      return response.data;
    } catch (error: any) {
      console.error(`[PythonBridge] Failed to call Python forensic service: ${error.message}`);
      throw new Error('Forensic rendering service unavailable');
    }
  }
}
