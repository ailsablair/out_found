import express from 'express';
import dotenv from 'dotenv';
import forensicRoutes from './gateway/routes/ForensicRoutes.js';
import { InvestigativeHub } from './core/InvestigativeHub.js';
import { FOIAGenerator } from './modules/legal/FOIAGenerator.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const hub = new InvestigativeHub();
const foia = new FOIAGenerator();

app.use(express.json());

// Gateway Routing
app.use('/api/forensic', forensicRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', name: 'Out&Found API Gateway' });
});

app.post('/api/cases', async (req, res) => {
  try {
    const { caseData, signatures } = req.body;
    const result = await hub.processNewCase(caseData, signatures);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/recovery', async (req, res) => {
  try {
    const { caseId, pHash } = req.body;
    const result = await hub.handleRecovery(caseId, pHash);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/legal/foia', (req, res) => {
  try {
    const result = foia.generateRequest(req.body);
    res.json({ requestText: result });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Out&Found Gateway listening on port ${port}`);
});
