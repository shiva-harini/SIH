const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult, query } = require('express-validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// SOS rate limiting (more restrictive)
const sosLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 3 // limit each IP to 3 SOS requests per 5 minutes
});

// Mock Database (In production, use MongoDB/PostgreSQL)
let sosAlerts = [];
let userReports = [];
let safeLocations = [
    {
        id: 1,
        name: 'Community Hall (Evacuation Shelter)',
        latitude: 20.5937,
        longitude: 78.9629,
        capacity: 500,
        type: 'shelter',
        distance: 0.5,
        facilities: ['Water', 'Food', 'First Aid', 'Communications'],
        status: 'available'
    },
    {
        id: 2,
        name: 'Local School (Designated Shelter)',
        latitude: 20.6037,
        longitude: 78.9729,
        capacity: 300,
        type: 'school',
        distance: 1.2,
        facilities: ['Water', 'Basic Shelter', 'Communications'],
        status: 'available'
    },
    {
        id: 3,
        name: 'District Hospital',
        latitude: 20.6137,
        longitude: 78.9829,
        capacity: null,
        type: 'hospital',
        distance: 1.8,
        facilities: ['Medical Aid', 'Emergency Care', 'Ambulance'],
        status: 'available'
    },
    {
        id: 4,
        name: 'Public Library',
        latitude: 20.6237,
        longitude: 78.9929,
        capacity: 150,
        type: 'building',
        distance: 2.1,
        facilities: ['Shelter', 'Communications', 'Information'],
        status: 'available'
    },
    {
        id: 5,
        name: 'Sports Complex',
        latitude: 20.6337,
        longitude: 79.0029,
        capacity: 1000,
        type: 'sports',
        distance: 2.5,
        facilities: ['Large Space', 'Water', 'Parking'],
        status: 'available'
    }
];

let currentAlerts = [
    {
        id: 1,
        type: 'Cyclone Warning',
        severity: 'high',
        location: 'Bay of Bengal Coast',
        description: 'Severe cyclonic storm approaching. Evacuate immediately.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        active: true,
        affectedAreas: ['Odisha', 'West Bengal', 'Andhra Pradesh']
    },
    {
        id: 2,
        type: 'Flood Alert',
        severity: 'medium',
        location: 'Eastern Districts',
        description: 'Heavy rainfall causing water level rise in major rivers.',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        active: true,
        affectedAreas: ['Bihar', 'Jharkhand', 'West Bengal']
    },
    {
        id: 3,
        type: 'Heat Wave',
        severity: 'low',
        location: 'Northern Plains',
        description: 'Temperature expected to reach 45°C. Stay hydrated.',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        active: true,
        affectedAreas: ['Rajasthan', 'Punjab', 'Haryana']
    }
];

let upcomingDisasters = [
    {
        id: 1,
        type: 'Cyclone Watch',
        location: 'Bay of Bengal',
        timeline: '3-5 days',
        description: 'Expected to make landfall near Odisha coast.',
        probability: 75,
        expectedImpact: 'high'
    },
    {
        id: 2,
        type: 'High Flood Alert',
        location: 'Eastern India',
        timeline: '1-2 weeks',
        description: 'Heavy rainfall predicted. River levels may rise rapidly.',
        probability: 60,
        expectedImpact: 'medium'
    },
    {
        id: 3,
        type: 'Monsoon Alert',
        location: 'Central India',
        timeline: '3 weeks',
        description: 'Extended heavy monsoon expected, increasing flood risk.',
        probability: 85,
        expectedImpact: 'medium'
    }
];

// Utility Functions
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
}

function deg2rad(deg) {
    return deg * (Math.PI/180);
}

function generateAlertId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

// API Routes

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// SOS Emergency Alert
app.post('/api/sos', 
    sosLimiter,
    [
        body('latitude').isFloat({ min: -90, max: 90 }).withMessage('Invalid latitude'),
        body('longitude').isFloat({ min: -180, max: 180 }).withMessage('Invalid longitude'),
        body('message').optional().isLength({ max: 500 }).withMessage('Message too long'),
        body('contactNumber').optional().isMobilePhone().withMessage('Invalid phone number')
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { latitude, longitude, message, contactNumber } = req.body;
            const alertId = generateAlertId();
            
            const sosAlert = {
                id: alertId,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                message: message || 'Emergency SOS alert',
                contactNumber: contactNumber || null,
                timestamp: new Date(),
                status: 'active',
                responderAssigned: false,
                estimatedResponseTime: Math.floor(Math.random() * 20) + 10 // 10-30 minutes
            };

            sosAlerts.push(sosAlert);

            // Simulate emergency services notification
            console.log(`🚨 SOS ALERT: ${alertId} at coordinates (${latitude}, ${longitude})`);
            
            // In production, this would:
            // 1. Send to emergency services API
            // 2. Send SMS notifications
            // 3. Update real-time dashboard
            // 4. Log to database

            res.status(201).json({
                success: true,
                alertId: alertId,
                message: 'SOS alert sent successfully',
                estimatedResponseTime: `${sosAlert.estimatedResponseTime} minutes`,
                timestamp: sosAlert.timestamp
            });

        } catch (error) {
            console.error('SOS Alert Error:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Failed to send SOS alert' 
            });
        }
    }
);

// Get SOS Alert Status
app.get('/api/sos/:alertId', (req, res) => {
    const { alertId } = req.params;
    const alert = sosAlerts.find(a => a.id === alertId);
    
    if (!alert) {
        return res.status(404).json({ message: 'Alert not found' });
    }
    
    res.json(alert);
});

// Get Nearby Safe Locations
app.get('/api/safe-locations',
    [
        query('lat').isFloat({ min: -90, max: 90 }).withMessage('Invalid latitude'),
        query('lng').isFloat({ min: -180, max: 180 }).withMessage('Invalid longitude'),
        query('radius').optional().isFloat({ min: 1, max: 100 }).withMessage('Invalid radius')
    ],
    (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { lat, lng, radius = 10 } = req.query;
            const userLat = parseFloat(lat);
            const userLng = parseFloat(lng);
            const searchRadius = parseFloat(radius);

            const nearbyLocations = safeLocations
                .map(location => ({
                    ...location,
                    distance: calculateDistance(userLat, userLng, location.latitude, location.longitude)
                }))
                .filter(location => location.distance <= searchRadius)
                .sort((a, b) => a.distance - b.distance);

            res.json({
                success: true,
                locations: nearbyLocations,
                total: nearbyLocations.length
            });

        } catch (error) {
            console.error('Safe Locations
