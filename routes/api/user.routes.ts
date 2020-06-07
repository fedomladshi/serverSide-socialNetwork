import express from "express";

import UserController from "../../controllers/user.controllers";
import auth from "../../middleware/auth";
import uploadAvatar from "../../middleware/uploadAvatar";
const router = express.Router();

router.get('/',auth, UserController.getUsers);
router.delete('/',auth, UserController.deleteUser);
router.delete('/avatar',auth, UserController.deleteAvatar);
router.put('/status', auth, UserController.updateUserStatus);
router.put('/avatar', auth, uploadAvatar, UserController.updateUserAvatar)
router.put('/edit', auth, UserController.editUser)
router.post('/add-friend', auth, UserController.addFriend);
router.post('/remove-friend', auth, UserController.removeFriend);
router.get('/get-friends', auth, UserController.getFriends);

module.exports = router;
