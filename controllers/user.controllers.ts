import { RequestHandler } from "express";
import UserService from "../services/user.services";
import uploadAvatar from "../middleware/uploadAvatar";
import fs from "fs";
import path from "path";

class UserController {
  static getUsers: RequestHandler = async (req, res) => {
    try {
      const limit = Number(req.query.limit);
      const skip = Number(req.query.skip);
      const gender = req.query.gender;
      const { users, pages, usersAmount } = await UserService.getUsers(
        limit,
        skip,
        gender,
        req.user.id
      );
      res.json({ users, pages, usersAmount });
    } catch (error) {
      console.error(error);
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
      const user = await UserService.updateUserStatus(
        req.user,
        req.body.status
      );
      res.json({ user });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  };
  static editUser: RequestHandler = async (req, res) => {
    try {
      const user = await UserService.editUser(req.user, req.body);

      res.json({
        user,
        msg: "User has been successfuly changed",
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };

  static updateUserAvatar: RequestHandler = async (req, res) => {
    try {
      console.log(req.body);
      uploadAvatar(req, res, async (err) => {
        if (err) {
          res.status(400).json({ msg: err });
        } else {
          if (req.file == undefined) {
            res.status(400).json({ msg: "Error: No File Selected!" });
          } else {
            const data = await UserService.updateUserAvatar(
              req.user.id,
              req.file.path
            );
            res.json({
              msg: "Avatar has been successfully changed",
              destination: data.avatar,
            });
          }
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };

  static deleteAvatar: RequestHandler = async (req, res) => {
    try {
      const directory = `./uploads/users/${req.user.email}/images/avatar`;
      await fs.readdir(directory, (err, files) => {
        if (err) throw err;
        for (const file of files) {
          fs.unlink(path.join(directory, file), (err) => {
            if (err) throw err;
          });
        }
      });

      const data = await UserService.deleteUserAvatar(
        req.user.id,
        "./uploads/defaults/defaultAvatar.jpg"
      );
      res.json({
        msg: "Avatar has been successfully deleted",
        destination: data.avatar,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };
  static addFriend: RequestHandler = async (req, res) => {
    try {
      const friends = await UserService.addFriend(req.user, req.body);
      res.json({ msg: "User has beed successfully added to friends", friends });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };

  static removeFriend: RequestHandler = async (req, res) => {
    try {
      const friends = await UserService.removeFriend(req.user, req.body);
      res.json({
        msg: "User has beed successfully removed from friends",
        friends,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };

  static getFriends: RequestHandler = async (req, res) => {
    try {
      const user = await UserService.getFriends(req.user);
      res.json({ friends: user.friends });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };
}

export default UserController;
