const cloudinary = require('../config/cloudinary');
const fs = require('fs');

const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: "my-app",
            resource_type: "image"
        });

        // delete local file
        fs.unlinkSync(filePath);

        return {
            url: result.secure_url,
            publicId: result.public_id,
        };

    } catch (error) {
        console.error('Error while uploading to cloudinary', error);
        throw new Error('Error while uploading to cloudinary');
    }
};

module.exports = {
    uploadToCloudinary
};