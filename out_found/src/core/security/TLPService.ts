export enum TLPColor {
  RED = 'RED',       // Restricted to participants only
  AMBER = 'AMBER',   // Restricted to participants' organization
  GREEN = 'GREEN',   // Restricted to the community
  CLEAR = 'CLEAR'    // Public
}

export interface TLPData {
  content: any;
  color: TLPColor;
  originator: string;
}

export class TLPService {
  public static canShare(data: TLPData, targetOrganization: string, userOrganization: string): boolean {
    switch (data.color) {
      case TLPColor.RED:
        return false; // Only participants, manual check required
      case TLPColor.AMBER:
        return targetOrganization === userOrganization;
      case TLPColor.GREEN:
        return true; // Usually shared within a sector
      case TLPColor.CLEAR:
        return true;
      default:
        return false;
    }
  }
}
