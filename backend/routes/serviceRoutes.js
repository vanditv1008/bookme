import express from 'express';
import { createServices,deleteService,listService,updateService } from '../controllers/serviceController.js';
import auth from '../middleware/auth.js';


const router=express.Router();

router.get('/',auth,listService);
router.get('/',auth,createServices);
router.get('/:id',auth,updateService);
router.get('/:id',auth,deleteService);

export default router;
