import { expect } from 'chai';
import { SignatureLinker } from '../src/modules/forensic/SignatureLinker.js';

describe('SignatureLinker', () => {
  const linker = new SignatureLinker();

  it('should find links between cases with same signatures', () => {
    const case1 = { caseId: '1', signatures: ['ligature-a'], state: 'GA' };
    const case2 = { caseId: '2', signatures: ['ligature-a'], state: 'AL' };

    linker.registerCaseSignatures(case1);
    const links = linker.findCrossJurisdictionalLinks(case2);

    expect(links).to.have.lengthOf(1);
    expect(links[0]!.targetCaseId).to.equal('1');
    expect(links[0]!.isCrossBorder).to.be.true;
  });
});
