import crypto from 'crypto';

export class Encryption {
  private static readonly algorithm = 'aes-256-cbc';

  private static readonly keys: Record<string, Buffer> = {
    'v1': Buffer.from(process.env.ENCRYPTION_KEY_V1 || '0'.repeat(64), 'hex'),
    'v2': Buffer.from(process.env.ENCRYPTION_KEY_V2 || '1'.repeat(64), 'hex'),
  };
  private static readonly currentKeyVersion = 'v2';

  public static encrypt(text: string): string {
    if (!text) return text;
    const iv = crypto.randomBytes(16);
    const key = this.keys[this.currentKeyVersion];
    if (!key) throw new Error('Encryption key not found');

    const cipher = crypto.createCipheriv(this.algorithm, key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return `${this.currentKeyVersion}:${iv.toString('hex')}:${encrypted}`;
  }

  public static decrypt(encryptedData: string): string {
    if (!encryptedData || !encryptedData.includes(':')) return encryptedData;

    try {
      const [version, ivHex, encrypted] = encryptedData.split(':');
      if (!version || !ivHex || !encrypted) return encryptedData;

      const key = this.keys[version];
      if (!key) throw new Error(`Unknown key version: ${version}`);

      const iv = Buffer.from(ivHex, 'hex');
      const decipher = crypto.createDecipheriv(this.algorithm, key, iv);

      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch (e: any) {
      console.error(`[Encryption] Decryption failed: ${e.message}`);
      return encryptedData;
    }
  }

  public static rotateKey(oldData: string): string {
    const decrypted = this.decrypt(oldData);
    return this.encrypt(decrypted);
  }
}
