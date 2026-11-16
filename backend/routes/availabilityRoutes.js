import express from 'express';
import { listAvailability, listAvaiability, saveAvailability } from '../controllers/availibilityController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, listAvailability || listAvaiability);
router.put('/', auth, saveAvailability);

export default router;
