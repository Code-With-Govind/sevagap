import { Router } from 'express';
import { healthcareController } from '../controllers/healthcareController.js';
import { validateDistrictIdParam } from '../middleware/validator.js';

const router = Router();

router.get('/', healthcareController.getHealthcare);
router.get('/facilities', healthcareController.getFacilities);
router.get('/:districtId', validateDistrictIdParam, healthcareController.getHealthcareByDistrict);

export default router;
