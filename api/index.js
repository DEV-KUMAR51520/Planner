import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import dotenv from 'dotenv';

// Import connectDB, but delay its execution
import connectDB from '../backend/config/database.js'; 

dotenv.config();

const app = express();
let isConnected = false;
let routesInitialized = false;

// Function to initialize Express routes dynamically
const initializeRoutes = async () => {
    // Dynamically import routes to avoid synchronous module resolution errors
    const [
        authRoutes, 
        userRoutes, 
        bookingRoutes, 
        adminRoutes, 
        reviewRoutes, 
        queryRoutes, 
        destinationRoutes
    ] = await Promise.all([
        import('../backend/routes/auth.js'),
        import('../backend/routes/user.js'),
        import('../backend/routes/booking.js'),
        import('../backend/routes/admin.js'),
        import('../backend/routes/review.js'),
        import('../backend/routes/query.js'),
        import('../backend/routes/destination.js')
    ]).then(modules => modules.map(m => m.default));

    // Middleware
    app.use(cors({
        origin: true,
        credentials: true
    }));
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // API Routes (Prefixes corrected in previous step)
    app.use('/auth', authRoutes);
    app.use('/user', userRoutes);
    app.use('/booking', bookingRoutes);
    app.use('/admin', adminRoutes);
    app.use('/review', reviewRoutes);
    app.use('/query', queryRoutes);
    app.use('/destination', destinationRoutes);

    // Health check
    app.get('/health', (req, res) => {
        res.json({ 
            status: 'ok', 
            message: 'Travel Planner API is running successfully',
            timestamp: new Date().toISOString()
        });
    });

    // 404 handler
    app.use((req, res) => {
        res.status(404).json({
            status: 'error',
            message: 'Endpoint not found'
        });
    });

    routesInitialized = true;
};

// Database connection helper
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

// Vercel Handler
const handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    
    // 1. Initialize routes only once
    if (!routesInitialized) {
        await initializeRoutes();
    }

    // 2. Connect to database only when handling the request
    await dbConnect();

    return serverless(app)(event, context);
};

export { handler };