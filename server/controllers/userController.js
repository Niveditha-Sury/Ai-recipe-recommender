const User = require("../models/User");
const Recipe = require("../models/Recipe");

// Fetch the user's saved recipes
exports.getMyRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({ userId: req.user.userId });
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching saved recipes",
            error: error.message,
        });
    }
};

// Updated Pantry
exports.updatePantry = async (req, res) => {
    try {
        const { ingredients, allergies } = req.body; // Added allergies here so user can update both

        const user = await User.findByIdAndUpdate(
            req.user.userId,
            { pantry: ingredients, allergies: allergies },
            { new: true },
        ).select("-password");

        res.status(200).json({
            message: "Profile updated successfully",
            pantry: user.pantry,
            allergies: user.allergies,
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating profile settings" });
    }
};

// Get Full Profile including XP, Level, and History
exports.getProfile = async (req, res) => {
    try {
        console.log("[Profile] Fetching profile for:", req.user.userId);
        const user = await User.findById(req.user.userId)
            .select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        console.error("GET PROFILE ERROR:", error);
        res.status(500).json({ 
            message: "Error fetching profile", 
            error: error.message,
            stack: error.stack,
            requestedUserId: req.user?.userId 
        });
    }
};

// profile pic
exports.updateProfileImages = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { profilePic, coverPic } = req.body;
        let updates = {};

        // If a new profile picture was uploaded via Multer
        if (req.files?.profilePic) {
            // Normalize Windows paths to use forward slashes for URL consistency
            updates.profilePic = req.files.profilePic[0].path.replace(/\\/g, "/");
        } else if (profilePic !== undefined) {
            updates.profilePic = profilePic;
        }

        // If a new cover picture was uploaded via Multer
        if (req.files?.coverPic) {
            // Normalize Windows paths to use forward slashes for URL consistency
            updates.coverPic = req.files.coverPic[0].path.replace(/\\/g, "/");
        } else if (coverPic !== undefined) {
            updates.coverPic = coverPic;
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: "No image updates provided" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updates,
            { new: true },
        ).select("-password");

        res.status(200).json({
            message: "Images updated successfully!",
            profilePic: updatedUser.profilePic,
            coverPic: updatedUser.coverPic,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating images",
            error: error.message,
        });
    }
};

// Update basic profile info (name, age, experience, neverShowMe)
    exports.updateProfile = async (req, res) => {
    try {
        const { name, email, age, experience, allergies, pantry, neverShowMe, profilePic, coverPic, xp, level, cookDays } = req.body;

        const updates = {};
        if (name !== undefined) updates.name = name;
        if (email !== undefined) updates.email = email;
        if (age !== undefined) updates.age = age;
        if (experience !== undefined) updates.experience = experience;
        if (allergies !== undefined) updates.allergies = allergies;
        if (pantry !== undefined) updates.pantry = pantry;
        if (neverShowMe !== undefined) updates.neverShowMe = neverShowMe;
        if (profilePic !== undefined) updates.profilePic = profilePic;
        if (coverPic !== undefined) updates.coverPic = coverPic;
        if (xp !== undefined) updates.xp = xp;
        if (level !== undefined) updates.level = level;
        if (cookDays !== undefined) updates.cookDays = cookDays;

        // Use $set explicitly to avoid Mongoose issues with direct object updates
        const user = await User.findByIdAndUpdate(
            req.user.userId,
            { $set: updates },
            { new: true },
        ).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log(`[Profile Update] User ${user.email} updated. Fields: ${Object.keys(updates).join(", ")}`);
        
        res.status(200).json({
            message: "Profile updated successfully",
            user,
        });
    } catch (error) {
        console.error("UPDATE PROFILE ERROR:", error);
        res.status(500).json({ message: "Error updating profile" });
    }
};

// Add XP - dedicated endpoint for atomic XP updates
exports.addXp = async (req, res) => {
    try {
        const { amount } = req.body;
        if (amount === undefined || isNaN(amount)) {
            return res.status(400).json({ message: "Invalid XP amount" });
        }

        const user = await User.findByIdAndUpdate(
            req.user.userId,
            { $inc: { xp: amount } },
            { new: true },
        ).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Recalculate level (500 XP per level)
        const newLevel = Math.floor(user.xp / 500) + 1;
        if (user.level !== newLevel) {
            user.level = newLevel;
            await user.save();
        }

        console.log(`[XP] User ${user.email} earned ${amount} XP, total: ${user.xp}, level: ${user.level}`);

        res.status(200).json({
            message: "XP added successfully",
            xp: user.xp,
            user,
        });
    } catch (error) {
        console.error("ADD XP ERROR:", error);
        res.status(500).json({ message: "Error adding XP" });
    }
};

// Record a cooked recipe in user history
exports.recordCook = async (req, res) => {
    try {
        const { recipeId, title, emoji, cuisine } = req.body;
        console.log("[Record Cook] Recipe:", { recipeId, title, emoji, cuisine });

        // Safeguard for emoji being passed as an object (React component)
        let safeEmoji = "🍳";
        if (typeof emoji === "string") {
            safeEmoji = emoji;
        }

        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.history) user.history = [];
        
        // Push new record
        user.history.unshift({
            recipeId: String(recipeId),
            title,
            emoji: safeEmoji,
            cuisine,
            cookedAt: new Date(),
        });

        // Limit history to last 20 items
        if (user.history.length > 20) {
            user.history = user.history.slice(0, 20);
        }

        await user.save();
        res.status(200).json({ message: "Cook recorded successfully", history: user.history });
    } catch (error) {
        console.error("RECORD COOK ERROR:", error);
        res.status(500).json({ message: "Error recording cook", error: error.message });
    }
};

exports.syncSavedRecipes = async (req, res) => {
    try {
        const { savedRecipes } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.userId,
            { savedRecipes },
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "Saved recipes synced", savedRecipes: user.savedRecipes });
    } catch (error) {
        console.error("SYNC SAVED RECIPES ERROR:", error);
        res.status(500).json({ message: "Error syncing saved recipes", error: error.message });
    }
};
