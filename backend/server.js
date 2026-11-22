import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import http from 'http';
import {connectDB} from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import serviceRoutes from './routes/serviceRoutes.js'
import availabilityRoutes from './routes/availabilityRoutes.js'
import integrationRoutes from './routes/integrationRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import publicRoutes from './routes/publicRoutes.js';
import adminRoutes from './routes/adminRoutes.js'


const PORT=process.env.PORT || 5000;
const app = express();

//MIDDLEWARES
app.use(cors());
app.use(express.json());

// Ensure DB connection for serverless / traditional environments
connectDB().catch((err) => console.error('Initial DB connection error:', err.message));

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection error:', error.message);
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
});

// ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/integrations', integrationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/public', publicRoutes);
app.use('/public', publicRoutes);
app.use('/api/admin', adminRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'BookMe API is running' });
});

if (!process.env.VERCEL) {
  const server = http.createServer(app);

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use.`);
      process.exit(1);
    }
    throw error;
  });

  server.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
}

export default app;