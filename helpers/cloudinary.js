const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// Add your Cloudinary credentials here
// Get these from your Cloudinary dashboard: https://cloudinary.com/console
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

async function deleteImageUtil(publicId) {
  try {
    // Check if Cloudinary is configured
    if (!cloudinary.config().cloud_name) {
      console.warn("Cloudinary not configured. Image deletion skipped.");
      return { result: "ok" }; // Return success to avoid breaking the app
    }
    
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    throw error;
  }
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil, deleteImageUtil };
