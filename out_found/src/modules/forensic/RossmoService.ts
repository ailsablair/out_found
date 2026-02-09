import { type Coords } from '../../models/types.js';

export class RossmoService {
  private readonly bufferB = 0.5;
  private readonly decayH = 1.2;

  private manhattanDistance(p1: Coords, p2: Coords): number {
    return Math.abs(p1.lat - p2.lat) + Math.abs(p1.lng - p2.lng);
  }

  public calculateRossmoScore(gridPoint: Coords, crimeSites: Coords[]): number {
    let score = 0;
    for (const site of crimeSites) {
      const dist = this.manhattanDistance(gridPoint, site);
      if (dist > this.bufferB) {
        score += 1 / Math.pow(dist, this.decayH);
      } else {
        score += Math.pow(this.bufferB, this.decayH - 1) / Math.pow(2 * this.bufferB - dist, this.decayH);
      }
    }
    return score;
  }

  public getLikelyAnchorPoint(crimeSites: Coords[]): Coords {
    // Simplified: in a real app, this would iterate over a grid.
    // Here we just return the centroid as a placeholder.
    const lat = crimeSites.reduce((acc, s) => acc + s.lat, 0) / crimeSites.length;
    const lng = crimeSites.reduce((acc, s) => acc + s.lng, 0) / crimeSites.length;
    return { lat, lng };
  }
}
