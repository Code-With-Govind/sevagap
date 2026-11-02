import { Router } from 'express';
import { educationController } from '../controllers/educationController.js';
import { validateDistrictIdParam } from '../middleware/validator.js';

const router = Router();

router.get('/', educationController.getEducation);
router.get('/summary', educationController.getEducationSummary);
router.get('/:districtId', validateDistrictIdParam, educationController.getEducationByDistrict);

export default router;

