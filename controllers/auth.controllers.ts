import { createFolder } from "./../utils/createFolder";
import { RequestHandler } from "express";
import { registerValidation, loginValidation } from "../vaidation";
import AuthService from "../services/auth.services";
import { IUserSchema } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user: IUserSchema;
      path: string;
    }
  }
}

class AuthController {
  static registration: RequestHandler = async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
      createFolder(`../uploads/users/${req.body.email}`);
      createFolder(`../uploads/users/${req.body.email}/images`);
      createFolder(`../uploads/users/${req.body.email}/images/avatar`);

      await AuthService.registration(req.body);

      res.json({ msg: "User has beed registred" });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  static login: RequestHandler = async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
      const { token, user } = await AuthService.login(req.body);

      res.json({ token, user });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  static getUserById: RequestHandler = async (req, res) => {
    try {
      const user = await AuthService.getUserById(req.user);
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  };
}

export default AuthController;
