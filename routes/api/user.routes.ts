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

module.exports = router;
