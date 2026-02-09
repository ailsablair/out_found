import { BaseIntegration } from '../BaseIntegration.js';

export class WaybackIntegration extends BaseIntegration {
  constructor() {
    super('WaybackMachine', 'https://archive.org/wayback/available');
  }

  async checkAvailability(url: string) {
    return this.call({
      method: 'GET',
      params: { url }
    });
  }
}
