import { Router } from 'express';
import { ForensicService } from '../../modules/forensic/ForensicService.js';
import { RossmoService } from '../../modules/forensic/RossmoService.js';

const router = Router();
const forensic = new ForensicService();
const rossmo = new RossmoService();

router.post('/age-progression', async (req, res) => {
  const result = await forensic.requestAgeProgression(req.body);
  res.json(result);
});

router.post('/rossmo-score', (req, res) => {
  const { gridPoint, crimeSites } = req.body;
  const score = rossmo.calculateRossmoScore(gridPoint, crimeSites);
  res.json({ score });
});

export default router;
