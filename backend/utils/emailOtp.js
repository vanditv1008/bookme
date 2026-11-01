import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import EmailOtp from '../models/emailOtp.js';
import { sendOtpNotification } from './bookingNotifications.js';
//maximum allowed time
const OTP_TTL_MINUTES = 10;
const MAX_ATTEMPTS = 5;

const normalizedEmail = (email = '') => email.toLowerCase().trim();
const createCode = () => crypto.randomInt(100000, 1000000).toString();

export const requestEmailOtp = async ({ email, purpose }) => {
    const emailNormalized = normalizedEmail(email);
    if (!emailNormalized) {
        throw new Error('Email is required');
    }
    //ABOVE FUNCTION
    const code = createCode();
    const codeHash = await bcrypt.hash(code, 10);
    const expireAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);
    //
    await EmailOtp.deleteMany({
        email: emailNormalized,
        purpose,
        consumeAt: null,
    });

    await EmailOtp.create({
        email: emailNormalized,
        purpose,
        codeHash,
        expireAt,
    });
    await sendOtpNotification({
        email: emailNormalized,
        code,
        purpose,
    });
    return {
        sent: true,
        email: emailNormalized,
        expiresInMinutes: OTP_TTL_MINUTES,
    };
};

//sent to brevo for checking
export const verifyEmailOtp = async ({
    email,
    purpose,
    code,
    consume = false,
}) => {
    const emailNormalized = normalizedEmail(email);
    if (!emailNormalized || !code) {
        return {
            verified: false,
            reason: 'Email and OTP are required',
        };
    }
    const record = await EmailOtp.findOne({
        email: emailNormalized,
        purpose,
        consumeAt: null,
        expireAt: { $gt: new Date() },
    }).sort({ createdAt: -1 });
//if nothing recorded
    if (!record) {
        return {
            verified: false,
            reason: 'OTP expired or not found',
        };
    }
//attemps greater than 5
    if (record.attempts >= MAX_ATTEMPTS) {
        return {
            verified: false,
            reason: 'Too many OTP attempts. Request a new code',
        };
    }
    const isMatch = await bcrypt.compare(
        String(code).trim(),
        record.codeHash
    );
    //if not matched
    if (!isMatch) {
        record.attempts += 1;
        await record.save();
        return {
            verified: false,
            reason: 'Invalid OTP',
        };
    }
    
    if (consume) {
        record.consumeAt = new Date();
        await record.save();
    }

    return {
        verified: true,
        email: emailNormalized,
    };
};
