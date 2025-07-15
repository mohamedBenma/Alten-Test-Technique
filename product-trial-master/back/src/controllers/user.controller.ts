import * as userService from "../services/user.service";
import { RequestWithUser } from "../types/RequestWithUser";

import { Response, RequestHandler } from "express";

export const addToCart: RequestHandler = async (req, res) => {
  const request = req as RequestWithUser;
  const { productId } = request.body;
  const userId = request.user!.userId;

  const result = await userService.addToCart(userId, productId);
  res.json(result.cart);
};

export const removeFromCart = async (req: RequestWithUser, res: Response) => {
  const { productId } = req.body;
  const userId = req.user!.userId;
  const result = await userService.removeFromCart(userId, productId);
  res.json(result.cart);
};

export const getCart = async (req: RequestWithUser, res: Response) => {
  const userId = req.user!.userId;
  const cart = await userService.getCart(userId);
  res.json(cart);
};

export const addToWishlist = async (req: RequestWithUser, res: Response) => {
  const { productId } = req.body;
  const userId = req.user!.userId;
  const result = await userService.addToWishlist(userId, productId);
  res.json(result.wishlist);
};

export const removeFromWishlist = async (
  req: RequestWithUser,
  res: Response
) => {
  const { productId } = req.body;
  const userId = req.user!.userId;
  const result = await userService.removeFromWishlist(userId, productId);
  res.json(result.wishlist);
};

export const getWishlist = async (req: RequestWithUser, res: Response) => {
  const userId = req.user!.userId;
  const wishlist = await userService.getWishlist(userId);
  res.json(wishlist);
};
