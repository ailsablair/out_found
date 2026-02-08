import { type Case, type Coords, CaseStatus } from '../models/types.js';
import { NamUsIntegration } from '../services/osint/NamUsIntegration.js';
import { WaybackIntegration } from '../services/osint/WaybackIntegration.js';
import { RossmoService } from '../services/forensic/RossmoService.js';
import { LawEnforcementService } from '../services/legal/LawEnforcementService.js';
import { TakedownIntegration } from '../services/legal/TakedownIntegration.js';
import { SignatureLinker, type CaseSignature } from '../services/forensic/SignatureLinker.js';
import { SpatialSearchService } from '../services/forensic/SpatialSearchService.js';

export class InvestigativeHub {
  private namUs = new NamUsIntegration();
  private wayback = new WaybackIntegration();
  private rossmo = new RossmoService();
  private lea = new LawEnforcementService();
  private takedown = new TakedownIntegration();
  private signatureLinker = new SignatureLinker();
  private spatialSearch = new SpatialSearchService();

  public async processNewCase(caseData: Case, signatures: string[] = []) {
    console.log(`[InvestigativeHub] Processing new case: ${caseData.id}`);

    const [namUsMatch, waybackMatch] = await Promise.all([
      this.namUs.findCase({ name: caseData.fullName }),
      this.wayback.checkAvailability(caseData.sourceLinks[0] || '')
    ]);

    const anchorPoint = this.rossmo.getLikelyAnchorPoint([caseData.lastSeenCoords]);
    const agencies = this.lea.getNearestAgencies(caseData.lastSeenCoords);

    const searchPriorities = this.spatialSearch.getPrioritySearchZones(caseData);

    const currentSignatures: CaseSignature = {
      caseId: caseData.id,
      signatures,
      state: agencies[0]?.name.split(' ').pop() || 'Unknown'
    };
    const patterns = this.signatureLinker.findCrossJurisdictionalLinks(currentSignatures);
    this.signatureLinker.registerCaseSignatures(currentSignatures);

    const validationScore = (namUsMatch ? 50 : 0) + (waybackMatch ? 50 : 0);

    return {
      caseId: caseData.id,
      validationScore,
      anchorPoint,
      nearbyAgencies: agencies,
      searchPriorities,
      serialPatterns: patterns,
      sources: {
        namUs: namUsMatch ? 'Verified' : 'Not Found',
        wayback: waybackMatch ? 'Archived' : 'Not Found'
      }
    };
  }

  public async handleRecovery(caseId: string, pHash: string) {
    console.log(`[InvestigativeHub] Handling recovery for case: ${caseId}`);
    const removalResult = await this.takedown.requestUrlRemoval(`https://outfound.org/cases/${caseId}`);
    return {
      caseId,
      status: 'Scrubbing Initiated',
      removalResult: removalResult ? 'Success' : 'Fallback required'
    };
  }
}
