import express from 'express';
const router = express.Router();

// Admin login route
router.post('/login', (req, res) => {
    // Handle admin login
    res.send('Admin login endpoint');
});

export default router;