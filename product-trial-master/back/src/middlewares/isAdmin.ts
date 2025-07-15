import { Request, Response, NextFunction } from "express";
import { RequestWithUser } from "../types/RequestWithUser";
import logger from "../utils/logger";

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const user = (req as RequestWithUser).user;

  if (user?.email === "admin@admin.com") {
    logger.info(`🛡️ Accès admin accordé à : ${user.email}`);
    return next();
  }

  logger.warn(
    `❌ Accès interdit : utilisateur non-admin (${user?.email || "inconnu"})`
  );
  res
    .status(403)
    .json({ error: "Accès interdit : réservé à l’administrateur." });
};
