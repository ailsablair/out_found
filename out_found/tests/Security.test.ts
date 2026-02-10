import { expect } from 'chai';
import { Encryption } from '../src/utils/Encryption.js';
import { TLPService, TLPColor } from '../src/core/security/TLPService.js';

describe('Security Features', () => {
  describe('Encryption', () => {
    it('should encrypt and decrypt correctly', () => {
      const plainText = 'Sensitive Case Data';
      const encrypted = Encryption.encrypt(plainText);
      expect(encrypted).to.not.equal(plainText);
      expect(encrypted).to.contain(':');

      const decrypted = Encryption.decrypt(encrypted);
      expect(decrypted).to.equal(plainText);
    });

    it('should support key rotation', () => {
       const oldData = Encryption.encrypt('Rotate me');
       const rotatedData = Encryption.rotateKey(oldData);
       expect(rotatedData).to.contain('v2:');
       expect(Encryption.decrypt(rotatedData)).to.equal('Rotate me');
    });
  });

  describe('TLP Service', () => {
    it('should restrict RED data sharing', () => {
      const data = { content: '...', color: TLPColor.RED, originator: 'Org1' };
      const canShare = TLPService.canShare(data, 'Org2', 'Org1');
      expect(canShare).to.be.false;
    });

    it('should allow AMBER data sharing within the same org', () => {
      const data = { content: '...', color: TLPColor.AMBER, originator: 'Org1' };
      const canShare = TLPService.canShare(data, 'Org1', 'Org1');
      expect(canShare).to.be.true;
    });
  });
});
