const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model
const FormData=require('../models/FormData')
 
// Route to get user data by email
router.get('/:email', async (req, res) => {
    try {
        const userEmail = req.params.email;
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Only send necessary user data (you may adjust based on your requirements)
        const fd=await FormData.findOne({email:userEmail})
        const userData = {
            email: user.email,
            firstName: fd.firstName,
            lastName: fd.lastName
        };
        res.json(userData);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
 
module.exports = router;