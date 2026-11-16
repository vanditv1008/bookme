import express from 'express';
import {
  getMe,
  loginUser,
  registerUser,
  requestRegistrationOTP,
  updateProfile,
  verifyRegistrationOTP,
} from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/register/request-otp', requestRegistrationOTP);
router.post('/register/verify-otp', verifyRegistrationOTP);
router.post('/login', loginUser);

// Support both GET and POST for /me
router.route('/me')
  .get(auth, getMe)
  .post(auth, getMe);

// Support both PUT and POST for /profile
router.route('/profile')
  .put(auth, updateProfile)
  .post(auth, updateProfile);

export default router;
