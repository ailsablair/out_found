import { type Coords, type Case } from '../../models/types.js';

export class SpatialSearchService {
  public getPrioritySearchZones(caseData: Case): string[] {
    const priorities: string[] = [];

    if (caseData.autismSpectrum) {
      priorities.push('WATER-FIRST: Bodies of water within a 1-mile radius of last seen coordinates.');
      priorities.push('HIGH-SENSORY: Nearby pools, construction sites, and train tracks.');
    }

    // Default priorities
    priorities.push('Standard radius search based on terrain.');

    return priorities;
  }

  public getSearchRadius(caseData: Case): number {
    if (caseData.autismSpectrum) {
      return 2; // Miles - often found within close proximity
    }
    return 50; // Miles - default for endangered missing
  }
}
