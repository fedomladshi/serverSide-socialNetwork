import express, { Request, Response } from "express";
import auth from "../../middleware/auth";
import AuthController from "../../controllers/auth.controllers";

const router = express.Router();

// @route     GET api/auth
// @desc      get auth user
// @access    Public
router.get("/", auth, AuthController.getUserById);

// @route     POST api/auth/login
// @desc      Authenticate user & get token
// @access    Public

router.post("/login", AuthController.login);


// @route     POST api/auth
// @desc      Register route
// @access    Public

router.post("/", AuthController.registration);


module.exports = router;
