import cloudinary from "../config/cloudinary.js";
import User from "../models/user.js";

const updateProfileController = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ available after auth.js fix
    let photoUrl = req.user.profilePicture; // keep old if no new upload

    if (req.file) {
      // Wrap upload_stream in a Promise
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "profile_photos" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        // ✅ Send buffer to cloudinary
        uploadStream.end(req.file.buffer);
      });

      photoUrl = result.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: photoUrl },
      { new: true }
    ).select("-password");

    return res.json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    console.error("Update error:", err);
    return res.status(500).json({ error: "Failed to update profile" });
  }
};

export default updateProfileController;
