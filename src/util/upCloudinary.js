const cloudinary = require('../config/coludinary');

const uploadToCloudinary = async (filePath, folder = 'shop8') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
    });
    return result;
  } catch (error) {
    throw new Error('Error uploading to Cloudinary');
  }
};

module.exports = {uploadToCloudinary};