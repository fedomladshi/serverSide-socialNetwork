import express from "express";
import auth from "../../middleware/auth";
import FriendshipController from "../../controllers/friendship.controller";


const router = express.Router();

// @route     GET api/friendship
// @desc      get list of all friendships
// @access    Private
router.get("/", auth, FriendshipController.getAllFriendships);

// @route     POST api/friendship
// @desc      send friend request
// @access    Private
router.post("/", auth, FriendshipController.sendFriendRequest);

// @route     POST api/friendship
// @desc      cancel friend request
// @access    Private
router.post("/cancel", auth, FriendshipController.cancelFriendRequest);

// @route     post api/friendship
// @desc      deny friend request
// @access    Private
router.post("/deny", auth, FriendshipController.denyFriendRequest);

// @route     post api/friendship/add
// @desc      deny friend request
// @access    Private
router.post("/deny", auth, FriendshipController.acceptFriendRequest);



module.exports = router;
