import { type Case, type Coords } from '../../models/types.js';

export interface Signature {
  id: string;
  type: string;
  description: string;
}

export interface CaseSignature {
  caseId: string;
  signatures: string[]; // List of signature IDs
  state: string;
}

export class SignatureLinker {
  private caseSignatures: CaseSignature[] = [];

  public registerCaseSignatures(caseSign: CaseSignature) {
    this.caseSignatures.push(caseSign);
  }

  public findCrossJurisdictionalLinks(currentCase: CaseSignature) {
    const links = [];

    for (const otherCase of this.caseSignatures) {
      if (otherCase.caseId === currentCase.caseId) continue;

      // Check for signature matches
      const commonSignatures = currentCase.signatures.filter(s =>
        otherCase.signatures.includes(s)
      );

      if (commonSignatures.length > 0) {
        // If they are in different states, it's a cross-jurisdictional link
        const isCrossBorder = otherCase.state !== currentCase.state;

        links.push({
          targetCaseId: otherCase.caseId,
          commonSignatures,
          isCrossBorder,
          confidence: commonSignatures.length / Math.max(currentCase.signatures.length, 1)
        });
      }
    }

    return links.sort((a, b) => b.confidence - a.confidence);
  }
}
