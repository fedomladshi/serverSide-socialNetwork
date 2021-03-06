import express from "express";
import auth from "../../middleware/auth";
import User from "../../models/User";
import Profile from "../../models/Profile";
const router = express.Router();

// @route     GET api/profile/me
// @desc      Get current users profile
// @access    Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     POST api/profile
// @desc      Create or update user profile
// @access    Private
router.post("/", auth, async (req, res) => {
  try {

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
