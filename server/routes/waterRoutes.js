import { Router } from 'express';
import { waterController } from '../controllers/waterController.js';
import { validateDistrictIdParam } from '../middleware/validator.js';

const router = Router();

router.get('/', waterController.getWater);
router.get('/summary', waterController.getWaterSummary);
router.get('/:districtId', validateDistrictIdParam, waterController.getWaterByDistrict);

export default router;

