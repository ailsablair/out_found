import { expect } from 'chai';
import { FOIAGenerator } from '../src/services/legal/FOIAGenerator.js';

describe('FOIAGenerator', () => {
  const gen = new FOIAGenerator();

  it('should generate GA specific request', () => {
    const request = gen.generateRequest({
      state: 'GA',
      agencyName: 'Atlanta PD',
      requesterName: 'Jane',
      caseDetails: 'Case #123',
      requestType: 'body-cam'
    });

    expect(request).to.contain('Georgia Open Records Act');
    expect(request).to.contain('Atlanta PD');
    expect(request).to.contain('body-cam');
  });
});
