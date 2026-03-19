const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../middleware/auth"); // Middleware to verify JWT
const userController = require("../controllers/userController");

// Set up Multer
const upload = multer({ dest: "uploads/" });

// USER ROUTES

// Get the logged-in user's full profile (XP, Level, Badges)
router.get("/profile", auth, userController.getProfile);

// Update pantry/inventory manually
router.put("/pantry", auth, userController.updatePantry);

// Update profile and cover images
router.put(
    "/update-images",
    auth,
    upload.fields([
        { name: "profilePic", maxCount: 1 },
        { name: "coverPic", maxCount: 1 },
    ]),
    userController.updateProfileImages,
);

// Fetch saved recipes for this specific user
router.get("/my-recipes", auth, userController.getMyRecipes);

// Update basic profile info (name, age, etc.)
router.put("/profile", auth, userController.updateProfile);

// Add XP (dedicated endpoint for atomic XP increments)
router.post("/add-xp", auth, userController.addXp);

// Record a cook event
router.post("/record-cook", auth, userController.recordCook);

// Sync saved recipes
router.post("/sync-saved", auth, userController.syncSavedRecipes);

module.exports = router;
