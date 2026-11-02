import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import districtRoutes from './routes/districtRoutes.js';
import educationRoutes from './routes/educationRoutes.js';
import healthcareRoutes from './routes/healthcareRoutes.js';
import waterRoutes from './routes/waterRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { db } from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

// 1. Core Middlewares
app.use(cors({
  origin: CORS_ORIGIN === '*' ? true : CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Request Logger (development only)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });
}

// 3. Health & Status Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    database: db.isConnected ? 'CONNECTED' : 'STANDALONE_FALLBACK',
    timestamp: new Date().toISOString(),
    service: 'SevaGap REST API Engine',
  });
});

// 4. Mount API Routes
app.use('/api/districts', districtRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/healthcare', healthcareRoutes);
app.use('/api/water', waterRoutes);
app.use('/api/analytics', analyticsRoutes);

// 5. Error & 404 Handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;

