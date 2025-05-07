import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// router.put("/update-profile", protectRoute, updateProfile);
router.put("/update-profile",  updateProfile);

// router.get('/check', protectRoute, checkAuth)
router.get('/check', checkAuth)


export default router;
