import { BaseIntegration } from '../BaseIntegration.js';

export class NamUsIntegration extends BaseIntegration {
  constructor() {
    super('NamUs', 'https://www.namus.gov/api');
  }

  async findCase(params: any) {
    return this.call({
      method: 'POST',
      url: '/CaseSearch/MissingPersons',
      data: params
    });
  }
}
