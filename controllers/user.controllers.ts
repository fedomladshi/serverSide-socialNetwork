import { RequestHandler } from "express";
import UserService from "../services/user.services";

class UserController {
  static getUsers: RequestHandler = async (req, res) => {
    try {
      const users = await UserService.getUsers();
      res.json(users);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  };
  static deleteUser: RequestHandler = async (req, res) => {
    try {
      await UserService.deleteUser(req.user);
      res.json({ msg: "User has been deleted" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  };
  static updateUserStatus: RequestHandler = async (req, res) => {
    try {
      await UserService.updateUserStatus(req.user, req.body.status);
      res.json({ msg: "User status has been updated" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  };
}

export default UserController;
