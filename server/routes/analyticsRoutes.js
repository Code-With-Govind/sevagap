import { Router } from 'express';
import { analyticsController } from '../controllers/analyticsController.js';

const router = Router();

router.get('/dashboard', analyticsController.getDashboard);
router.get('/district-comparison', analyticsController.getDistrictComparison);

export default router;

