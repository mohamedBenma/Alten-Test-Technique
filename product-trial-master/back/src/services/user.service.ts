import { PrismaClient } from "@prisma/client";
import logger from "../utils/logger";

const prisma = new PrismaClient();

export const addToCart = async (userId: number, productId: number) => {
  logger.info(
    `Ajout du produit ${productId} au panier de l'utilisateur ${userId}`
  );
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      cart: { connect: { id: productId } },
    },
    include: { cart: true },
  });
  return updatedUser;
};

export const removeFromCart = async (userId: number, productId: number) => {
  logger.info(
    `Retrait du produit ${productId} du panier de l'utilisateur ${userId}`
  );
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      cart: { disconnect: { id: productId } },
    },
    include: { cart: true },
  });
  return updatedUser;
};

export const getCart = async (userId: number) => {
  logger.info(`Récupération du panier de l'utilisateur ${userId}`);
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { cart: true },
  });
  return user?.cart;
};

export const addToWishlist = async (userId: number, productId: number) => {
  logger.info(
    `Ajout du produit ${productId} aux favoris de l'utilisateur ${userId}`
  );
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      wishlist: { connect: { id: productId } },
    },
    include: { wishlist: true },
  });
  return updatedUser;
};

export const removeFromWishlist = async (userId: number, productId: number) => {
  logger.info(
    `Retrait du produit ${productId} des favoris de l'utilisateur ${userId}`
  );
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      wishlist: { disconnect: { id: productId } },
    },
    include: { wishlist: true },
  });
  return updatedUser;
};

export const getWishlist = async (userId: number) => {
  logger.info(`Récupération des favoris de l'utilisateur ${userId}`);
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { wishlist: true },
  });
  return user?.wishlist;
};
