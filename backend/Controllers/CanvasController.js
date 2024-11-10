const User = require('../Models/User');

exports.saveCanvas = async (req, res) => {
    const { userId, image } = req.body; 

    try {
        // Find the user and update their canvas image
        const updatedUser = await User.findByIdAndUpdate(userId, { myFile: image }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, message: 'Canvas image saved successfully', user: updatedUser });
    } catch (error) {
        console.error('Error saving canvas image:', error);
        res.status(500).json({ success: false, message: 'Error saving canvas image' });
    }
};
