import { RequestHandler } from "express";
import FriendshipService from "../services/friendship.services";
import { IUserSchema } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user: IUserSchema;
      path: string;
    }
  }
}

class FriendshipController {
  static getAllFriendships: RequestHandler = async (req, res) => {
    try {
      const friendships = await FriendshipService.getAllFriendships();
      res.json({ friendships });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };
  static sendFriendRequest: RequestHandler = async (req, res) => {
    try {
      const { friendId } = req.body;
      const friendships = await FriendshipService.sendFriendRequest(
        req.user.id,
        friendId
      );
      res.json({ friendships });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };

  static cancelFriendRequest: RequestHandler = async (req, res) => {
    try {
      const { friendId } = req.body;
      await FriendshipService.cancelFriendRequest(req.user.id, friendId);
      res.json({ msg: "The request was canceled" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };
  static denyFriendRequest: RequestHandler = async (req, res) => {
    try {
      const { friendId } = req.body;
      await FriendshipService.denyFriendRequest(req.user.id, friendId);
      res.json({ msg: "The request was denied" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };
  static acceptFriendRequest: RequestHandler = async (req, res) => {
     try {
       const { friendId } = req.body;
       await FriendshipService.acceptFriendRequest(req.user.id, friendId);
       res.json({ msg: "The request was denied" });
     } catch (err) {
       console.error(err.message);
       res.status(500).send("Server Error");
     }
   };
}

export default FriendshipController;
