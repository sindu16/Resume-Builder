const User = require('../models/User');

exports.getUserProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.profileImage || !user.profileImage.data) {
      return res.status(404).send('Image not found');
    }

    res.set('Content-Type', user.profileImage.contentType);
    res.send(user.profileImage.data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch image');
  }
};


