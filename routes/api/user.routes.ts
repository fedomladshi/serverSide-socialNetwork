import express from "express";

import UserController from "../../controllers/user.controllers";
import auth from "../../middleware/auth";
const router = express.Router();

router.get('/',auth, UserController.getUsers);
router.delete('/',auth, UserController.deleteUser);
router.put('/status', auth, UserController.updateUserStatus)

module.exports = router;
