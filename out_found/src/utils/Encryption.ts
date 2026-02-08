import crypto from 'crypto';

export class Encryption {
  private static readonly algorithm = 'aes-256-cbc';
  private static readonly key = Buffer.from(process.env.ENCRYPTION_KEY || '0'.repeat(64), 'hex');
  private static readonly iv = Buffer.from(process.env.ENCRYPTION_IV || '0'.repeat(32), 'hex');

  public static encrypt(text: string): string {
    if (!text) return text;
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  public static decrypt(encryptedText: string): string {
    if (!encryptedText) return encryptedText;
    try {
      const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
      let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch (e) {
      console.error('[Encryption] Decryption failed');
      return encryptedText;
    }
  }
}
