"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const InvestigativeHub_js_1 = require("../src/core/InvestigativeHub.js");
const NamUsIntegration_js_1 = require("../src/services/osint/NamUsIntegration.js");
const types_js_1 = require("../src/models/types.js");
describe('InvestigativeHub Resilience', () => {
    it('should continue processing even if NamUs integration fails', async () => {
        const hub = new InvestigativeHub_js_1.InvestigativeHub();
        // Mock NamUs to fail
        const namUsStub = sinon_1.default.stub(NamUsIntegration_js_1.NamUsIntegration.prototype, 'findCase').resolves(null);
        const mockCase = {
            id: 'test-123',
            fullName: 'John Doe',
            status: types_js_1.CaseStatus.ACTIVE,
            lastSeenDate: new Date(),
            lastSeenCoords: { lat: 34.05, lng: -118.24 },
            autismSpectrum: false,
            validationScore: 0,
            sourceLinks: ['https://example.com']
        };
        const result = await hub.processNewCase(mockCase);
        (0, chai_1.expect)(result.caseId).to.equal('test-123');
        (0, chai_1.expect)(result.sources.namUs).to.equal('Not Found');
        // Ensure the overall process didn't crash
        (0, chai_1.expect)(result.anchorPoint).to.have.property('lat');
        namUsStub.restore();
    });
});
//# sourceMappingURL=InvestigativeHub.test.js.map