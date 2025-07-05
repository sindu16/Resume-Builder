const express = require('express');
const router = express.Router();
const User = require('../models/User'); 

router.get('/test', (req, res) => {
  res.json({ message: 'User routes are working!' });
});


router.get('/info/:userId', async (req, res) => {
  try {
    console.log('Fetching user info for:', req.params.userId);
    
    const user = await User.findById(req.params.userId).select('-password');
    
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    
    const userInfo = {
      id: user._id,
      email: user.email,
      name: user.name,
      hasProfileImage: !!(user.profileImage && user.profileImage.data),
      profileImageType: user.profileImage ? user.profileImage.contentType : null,
      profileImageSize: user.profileImage && user.profileImage.data ? user.profileImage.data.length : 0
    };

   
    res.json(userInfo);
    
  } catch (err) {
    console.error('Error fetching user info:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


router.get('/profile-image/:userId', async (req, res) => {
  try {
    
    
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      
      return res.status(404).json({ message: 'User not found' });
    }
    
    
    
    if (!user.profileImage) {
      
      return res.status(404).json({ message: 'Profile image not found' });
    }
    
    if (!user.profileImage.data) {
    
      return res.status(404).json({ message: 'Profile image data not found' });
    }

    res.set({
      'Content-Type': user.profileImage.contentType || 'image/jpeg',
      'Content-Length': user.profileImage.data.length,
      'Cache-Control': 'public, max-age=86400',
      'Access-Control-Allow-Origin': '*'
    });

  
    
   
    if (Buffer.isBuffer(user.profileImage.data)) {
      res.send(user.profileImage.data);
    } else {
      
      res.send(Buffer.from(user.profileImage.data));
    }
    
    
    
  } catch (err) {
    
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/profile-image-base64/:userId', async (req, res) => {
  try {
    console.log('Fetching base64 image for:', req.params.userId);
    
    const user = await User.findById(req.params.userId);
    
    if (!user || !user.profileImage || !user.profileImage.data) {
      return res.status(404).json({ message: 'Profile image not found' });
    }

  
    let base64Data;
    if (Buffer.isBuffer(user.profileImage.data)) {
      base64Data = user.profileImage.data.toString('base64');
    } else {
      base64Data = Buffer.from(user.profileImage.data).toString('base64');
    }

    const dataUri = `data:${user.profileImage.contentType || 'image/jpeg'};base64,${base64Data}`;

    res.json({ 
      image: dataUri,
      contentType: user.profileImage.contentType,
      size: user.profileImage.data.length
    });
    
  } catch (err) {
    console.error('Error fetching base64 image:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;