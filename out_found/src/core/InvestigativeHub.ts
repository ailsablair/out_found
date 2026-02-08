import { type Case, type Coords, CaseStatus } from '../models/types.js';
import { NamUsIntegration } from '../services/osint/NamUsIntegration.js';
import { WaybackIntegration } from '../services/osint/WaybackIntegration.js';
import { RossmoService } from '../services/forensic/RossmoService.js';
import { LawEnforcementService } from '../services/legal/LawEnforcementService.js';
import { TakedownIntegration } from '../services/legal/TakedownIntegration.js';

export class InvestigativeHub {
  private namUs = new NamUsIntegration();
  private wayback = new WaybackIntegration();
  private rossmo = new RossmoService();
  private lea = new LawEnforcementService();
  private takedown = new TakedownIntegration();

  public async processNewCase(caseData: Case) {
    console.log(`[InvestigativeHub] Processing new case: ${caseData.id}`);

    // 1. Parallel multi-source validation (resilient)
    const [namUsMatch, waybackMatch] = await Promise.all([
      this.namUs.findCase({ name: caseData.fullName }),
      this.wayback.checkAvailability(caseData.sourceLinks[0] || '')
    ]);

    // 2. Geographic Profiling
    const anchorPoint = this.rossmo.getLikelyAnchorPoint([caseData.lastSeenCoords]);
    const agencies = this.lea.getNearestAgencies(caseData.lastSeenCoords);

    // 3. Update case with aggregated intel
    const validationScore = (namUsMatch ? 50 : 0) + (waybackMatch ? 50 : 0);

    return {
      caseId: caseData.id,
      validationScore,
      anchorPoint,
      nearbyAgencies: agencies,
      sources: {
        namUs: namUsMatch ? 'Verified' : 'Not Found',
        wayback: waybackMatch ? 'Archived' : 'Not Found'
      }
    };
  }

  public async handleRecovery(caseId: string, pHash: string) {
    console.log(`[InvestigativeHub] Handling recovery for case: ${caseId}`);

    // Trigger digital scrubbing
    const removalResult = await this.takedown.requestUrlRemoval(`https://outfound.org/cases/${caseId}`);

    return {
      caseId,
      status: 'Scrubbing Initiated',
      removalResult: removalResult ? 'Success' : 'Fallback required'
    };
  }
}
