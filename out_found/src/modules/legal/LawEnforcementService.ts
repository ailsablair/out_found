import { type Coords } from '../../models/types.js';

export interface LEAAgency {
  name: string;
  headquarters: Coords;
  phone: string;
  email: string;
  foiaPortal: string;
}

export class LawEnforcementService {
  private agencies: LEAAgency[] = [
    {
      name: 'Georgia Bureau of Investigation (GBI)',
      headquarters: { lat: 33.692, lng: -84.288 },
      phone: '404-244-2600',
      email: 'coldcase@gbi.ga.gov',
      foiaPortal: 'https://gbi.georgia.gov/open-records-requests'
    },
    // More agencies could be added or fetched from an API
  ];

  public getNearestAgencies(point: Coords, radiusMiles: number = 300): LEAAgency[] {
    // In a real app, use spatial queries. Here we just return the list.
    return this.agencies;
  }
}
