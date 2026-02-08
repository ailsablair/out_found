import sharp from 'sharp';

export class PHash {
  public static async generate(imagePath: string): Promise<string> {
    try {
      const result = await sharp(imagePath)
        .resize(8, 8, { fit: 'fill' })
        .grayscale()
        .raw()
        .toBuffer({ resolveWithObject: true });

      const data = result.data!;
      const mean = data.reduce((acc, val) => acc + val, 0) / data.length;
      let hash = 0n;
      for (let i = 0; i < data.length; i++) {
        if (data[i] >= mean) {
          hash |= (1n << BigInt(i));
        }
      }
      return hash.toString(16).padStart(16, '0');
    } catch (error: any) {
      console.warn(`[PHash] Failed to generate hash: ${error.message}`);
      return '';
    }
  }

  public static hammingDistance(h1: string, h2: string): number {
    const n1 = BigInt('0x' + h1);
    const n2 = BigInt('0x' + h2);
    let xor = n1 ^ n2;
    let distance = 0;
    while (xor > 0n) {
      if (xor & 1n) distance++;
      xor >>= 1n;
    }
    return distance;
  }
}
