import express from 'express';

import { getPaymentOverview,requestWithdrawal,updatePayoutDetails } from '../controllers/paymentController';

import auth from '../middleware/auth.js';

const router=express.Router();
router.get('/',auth,getPaymentOverview);
router.get('/payout-details',auth,updatePayoutDetails);
router.get('/withdrawals',auth,requestWithdrawal);

export default router;