import { expect } from 'chai';
import sinon from 'sinon';
import { InvestigativeHub } from '../src/core/InvestigativeHub.js';
import { NamUsIntegration } from '../src/services/osint/NamUsIntegration.js';
import { CaseStatus } from '../src/models/types.js';

describe('InvestigativeHub Resilience', () => {
  it('should continue processing even if NamUs integration fails', async () => {
    const hub = new InvestigativeHub();

    // Mock NamUs to fail
    const namUsStub = sinon.stub(NamUsIntegration.prototype, 'findCase').resolves(null);

    const mockCase = {
      id: 'test-123',
      fullName: 'John Doe',
      status: CaseStatus.ACTIVE,
      lastSeenDate: new Date(),
      lastSeenCoords: { lat: 34.05, lng: -118.24 },
      autismSpectrum: false,
      validationScore: 0,
      sourceLinks: ['https://example.com']
    };

    const result = await hub.processNewCase(mockCase);

    expect(result.caseId).to.equal('test-123');
    expect(result.sources.namUs).to.equal('Not Found');
    // Ensure the overall process didn't crash
    expect(result.anchorPoint).to.have.property('lat');

    namUsStub.restore();
  });
});
