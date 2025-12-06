import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../backend/config/database.js';

// Import routes
import authRoutes from '../backend/routes/auth.js';
import userRoutes from '../backend/routes/user.js';
import bookingRoutes from '../backend/routes/booking.js';
import adminRoutes from '../backend/routes/admin.js';
import reviewRoutes from '../backend/routes/review.js';
import queryRoutes from '../backend/routes/query.js';
import destinationRoutes from '../backend/routes/destination.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect to MongoDB
let isConnected = false;

const dbConnect = async () => {
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }
  
  try {
    await connectDB();
    isConnected = true;
    console.log('New MongoDB connection established');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// --- START: Corrected Routes Section ---
// Vercel rewrites /api/* to /* before handing it to this Express app, 
// so the prefix /api must be removed here.
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/booking', bookingRoutes);
app.use('/admin', adminRoutes);
app.use('/review', reviewRoutes);
app.use('/query', queryRoutes);
app.use('/destination', destinationRoutes);

// Health check (Corrected from /api/health to /health)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Travel Planner API is running on Netlify Functions',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint (Corrected from /api to /)
app.get('/', (req, res) => {
  res.json({ 
    message: 'Travel Planner API',
    version: '1.0.0',
    endpoints: [
      '/auth/*',
      '/user/*',
      '/booking/*',
      '/admin/*',
      '/review/*',
      '/query/*',
      '/destination/*'
    ]
  });
});

// 404 handler for API endpoints
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found'
  });
});
// --- END: Corrected Routes Section ---

// Ensure database connection before handling requests
const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await dbConnect();
  return serverless(app)(event, context);
};

export { handler };