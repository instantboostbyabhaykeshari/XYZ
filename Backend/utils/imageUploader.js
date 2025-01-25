const cloudinary=require("cloudinary").v2

exports.uploadImageToCloudinary = async (file, folderName, height, quality) => {
  if (!file || !file.tempFilePath) {
    throw new Error("File path is missing. Ensure files are uploaded correctly.");
  }

  const options = {
    folder: folderName || undefined,
    height: height || undefined,
    quality: quality || undefined,
    resource_type: "auto",
  };

  console.log("Uploading with options:", options);

  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    return result;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Image upload failed");
  }
};
