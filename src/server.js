const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import Database Connection
const sequelize = require('./config/db');

// Import Models (This tells Sequelize which tables to create)
const User = require('./models/User');
const FeedRecord = require('./models/FeedRecord');

const app = express();
console.log("Database URL Check:", process.env.DATABASE_URL);

// Middleware
app.use(cors());
app.use(express.json()); // Allows your app to read JSON data
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/feed', require('./routes/feedRoutes'));

// Basic Route to test if the server is alive
app.get('/', (req, res) => {
    res.send('BSF-Nutrifeed Backend is Running 🚀');
});

const startServer = async () => {
    try {
        // AUTHENTICATE & SYNC
        // { alter: true } updates your tables if you change the models later
        await sequelize.authenticate();
        console.log('✅ Connection to PostgreSQL has been established.');

        await sequelize.sync({ alter: true });
        console.log('✅ Database & Tables synchronized successfully.');

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`🚀 Server is active on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
};

startServer();