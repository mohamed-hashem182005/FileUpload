require('dotenv').config();
const express = require('express');
const connectDB = require('./database/db');
const authRoutes = require('./routes/auth-routes');
const homeRoutes = require('./routes/home-routes');
const adminRoutes = require('./routes/admin-routes');
const uploadImageRoutes = require('./routes/image-routes');

//connection to DB
connectDB();

const apps = express();

//Middlewares
apps.use(express.json());

apps.use('/api/auth', authRoutes);
apps.use('/api/home', homeRoutes);
apps.use('/api/admin', adminRoutes);
apps.use('/api/image',uploadImageRoutes)






apps.listen(process.env.PORT || 3000, () => {
    console.log('the Server is Running (Successfully) in PORT 3000');

})