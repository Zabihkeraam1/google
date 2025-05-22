const User = require('../models/user'); // Assuming you have a User model
const Owner = require('../models/owner'); // Assuming you have an Owner model

const authorizeOwner = async (req, res, next) => {
  // Check if the user is authenticated (authentication middleware should run before this)
  if (!req.user || !req.user.id) {
    return res.status(401).json({ msg: 'Not authorized' });
  }

  try {
    // In a single-owner scenario, you might fetch the single owner
    const owner = await Owner.findOne();

    // If there's no owner defined, you might have a different logic,
    // but for this case, we'll assume an owner should exist if data exists.
    if (!owner) {
        // Handle the case where there is no owner, perhaps indicate a setup issue
        return res.status(500).json({ msg: 'Portfolio owner not configured' });
    }

    // In a simple single-owner portfolio, we might just check if the authenticated
    // user's ID matches a predefined owner ID or if there's a direct link
    // between the User model and the Owner model.
    // For simplicity here, we'll assume the *first* user created is the owner.
    // In a real application, you'd link the User and Owner models more explicitly.

    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({ msg: 'User not found' });
    }

    // This is a simplified check assuming the first user created IS the owner.
    // A more robust approach would link User and Owner models.
    // For example, your Owner model could have a 'user' field referencing the User model.
    // const owner = await Owner.findOne({ user: req.user.id });
    // if (owner) { ... authorized ... }

    // Assuming the first user created is the owner for this example:
    const firstUser = await User.findOne().sort({ _id: 1 }); // Find the first user by creation order

    if (firstUser && firstUser._id.toString() === req.user.id) {
        // User is the owner, proceed to the next middleware or route handler
        next();
    } else {
        // User is not the owner, forbidden
        res.status(403).json({ msg: 'User not authorized to perform this action' });
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = authorizeOwner;