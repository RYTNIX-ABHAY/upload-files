import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

const uptl = async (filepath) => {
  try {
    if (!filepath) throw new Error("Invalid file location!");

    // Upload to Cloudinary
    const response = await cloudinary.uploader.upload(filepath, { resource_type: "auto" });

    // Delete the local file after successful upload
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    console.log("Uploaded to Cloudinary:", response.secure_url);
    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    // Delete local file if it still exists
    if (filepath && fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    return null;
  }
};

export default uptl;
