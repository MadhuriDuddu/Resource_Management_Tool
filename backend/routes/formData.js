const express = require('express');
const router = express.Router();
const FormData = require('../models/FormData');

router.post('/submitFormData', async (req, res) => {
    try {
        // Extract form data from request body
        const formData = req.body;

        // Save form data to MongoDB
        const savedFormData = await FormData.create(formData);

        res.status(201).json(savedFormData);
    } catch (error) {
        console.error("Error saving form data:", error);
        res.status(500).send("Internal Server Error");
    }
});


router.get('/allFormData', async (req, res) => {
  try {
    const {email} = req.query;
    const formData = await FormData.find({ reportingManagerEmail: email });
    res.json(formData);
    console.log(formData)
  } catch (error) {
    console.error('Error fetching form data:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// Delete form data
router.delete('/deleteFormData/:id', async (req, res) => {
  try {
    const formData = await FormData.findByIdAndDelete(req.params.id);
    if (!formData) {
      return res.status(404).json({ success: false, message: 'Form data not found' });
    }
    res.status(200).json({ success: true, message: 'Form data deleted successfully' });
  } catch (error) {
    console.error('Error deleting form data:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


// Route to check if form data exists for a given email
router.get('/check/:email', async (req, res) => {
  const email = req.params.email;

  try {
    // Check if form data exists for the provided email
    const formData = await FormData.findOne({ email });

    if (formData) {
      // If form data exists for the email, return true
      res.json({ exists: true });
    } else {
      // If no form data found, return false
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking form data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Code after adding the functionality for update details function 
// Get user data by email
router.get('/user/:email', async (req, res) => {
  const userEmail = req.params.email;
  try {
      const userData = await FormData.findOne({ email: userEmail });
      if (!userData) {
          return res.status(404).json({ message: 'User data not found' });
      }
      res.json(userData);
  } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Server error' });
  }
});



// Code after adding the functionality for backend for update button 
router.put('/update/:email', async (req, res) => {
  const { email } = req.params;

  try {
    // Find the user's form data by email and update it with the new values
    const updatedFormData = await FormData.findOneAndUpdate(
      { email },
      { $set: req.body },
      { new: true }
    );

    if (!updatedFormData) {
      return res.status(404).json({ message: 'Form data not found' });
    }

    res.json(updatedFormData);
  } catch (error) {
    console.error('Failed to update form data:', error);
    res.status(500).json({ message: 'Failed to update form data' });
  }
});

module.exports = router;


