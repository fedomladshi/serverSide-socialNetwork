import express from "express";
import auth from "../../middleware/auth";
import Song from "../../models/Song";
// import uploadSongImage from "../../middleware/uploadImage";
const router = express.Router();

// @route     POST api/music/add
// @desc      POST add new song
// @access    Private
router.post("/add", auth, async (req, res) => {
  try {
    let { name, author, picture, newOne, popular, dateRelease } = req.body;

    // uploadSongImage(req, res, (err) => {
    //   if (err) {
    //     res.status(400).json({ msg: err });
    //   } else {
    //     if (req.file == undefined) {
    //       res.status(400).json({ msg: "Error: No File Selected!" });
    //     } else {
    //       picture = req.file.filename;
    //     }
    //   }
    // });

    const newSong = new Song({
      name,
      author,
      picture,
      newOne,
      popular,
      dateRelease,
    });

    await newSong.save();

    res.json(newSong);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
