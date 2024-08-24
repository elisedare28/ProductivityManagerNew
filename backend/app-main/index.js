const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const admin = require('./admin');  
const taskRoutes = require('./routes/taskroutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

app.use(cors({
    origin: ["https://productivity-manager-new.vercel.app"],
    methods: ["POST", "GET", "DELETE", "PUT", "OPTIONS"],
    credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('Error connecting to MongoDB:', error));

async function verifyToken(req, res, next) {
    const idToken = req.headers.authorization;
    if (!idToken) {
        return res.status(401).send('Unauthorized');
    }
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.userEmail = decodedToken.email;
        next();
    } catch (error) {
        return res.status(401).send('Unauthorized');
    }
}

app.use('/api/tasks', verifyToken, taskRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
