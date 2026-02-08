export interface Coords {
  lat: number;
  lng: number;
}

export enum CaseStatus {
  ACTIVE = 'active',
  COLD = 'cold',
  RECOVERED = 'recovered',
  UNIDENTIFIED = 'unidentified'
}

export interface Case {
  id: string;
  fullName?: string;
  status: CaseStatus;
  lastSeenDate: Date;
  lastSeenCoords: Coords;
  phash?: string;
  autismSpectrum: boolean;
  validationScore: number;
  sourceLinks: string[];
}
