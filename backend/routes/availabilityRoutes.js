import express from 'express';
import { listAvaiability, saveAvailability } from '../controllers/availibilityController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, listAvaiability);
router.get('/', auth, saveAvailability);
export default router;