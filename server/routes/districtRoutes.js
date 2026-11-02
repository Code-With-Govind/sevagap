import { Router } from 'express';
import { districtController } from '../controllers/districtController.js';
import { validateDistrictIdParam } from '../middleware/validator.js';

const router = Router();

router.get('/', districtController.getDistricts);
router.get('/:districtId', validateDistrictIdParam, districtController.getDistrictById);

export default router;
