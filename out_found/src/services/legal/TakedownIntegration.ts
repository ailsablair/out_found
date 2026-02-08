import { BaseIntegration } from '../BaseIntegration.js';

export class TakedownIntegration extends BaseIntegration {
  constructor() {
    super('GoogleSearchConsole', 'https://searchconsole.googleapis.com/v1');
  }

  async requestUrlRemoval(url: string) {
    return this.call({
      method: 'POST',
      url: '/urlNotifications:publish',
      data: { url, type: 'URL_DELETED' }
    });
  }
}
