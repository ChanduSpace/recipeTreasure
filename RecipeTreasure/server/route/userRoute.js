import { Router } from "express";
import registerUserController from "../controllers/userController.js";
import loginController from "../controllers/loginController.js";
import logoutController from "../controllers/logoutController.js";
import auth from "../middlewares/auth.js";
import updateProfileController from "../controllers/updateProfileController.js";
import upload from "../middlewares/multer.js";

const userRoute = Router();

userRoute.post("/register", registerUserController);
userRoute.post("/login", loginController);
userRoute.post("/logout", logoutController);

userRoute.get("/profile", auth, (req, res) => {
  res.json({ message: "Your profile info", user: req.user });
});
userRoute.put(
  "/profile",
  auth,
  upload.single("photo"),
  updateProfileController
);

export default userRoute;
