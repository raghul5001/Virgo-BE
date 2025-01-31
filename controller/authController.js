
const User = require('../models/User'); 

// Save or retrieve user data
const saveOrRetrieveUser = async (req, res) => {
    const { uid, email, displayName, photoURL } = req.body;

    try {
        let user = await User.findOne({ uid });

        if (!user) {
            user = new User({ uid, email, displayName, photoURL });
            await user.save();
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    saveOrRetrieveUser,
};