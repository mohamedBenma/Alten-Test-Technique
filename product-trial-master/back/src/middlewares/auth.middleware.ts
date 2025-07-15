import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { TokenPayload } from "../types/TokenPayload";
import { RequestWithUser } from "../types/RequestWithUser";
import logger from "../utils/logger";

const SECRET = process.env.JWT_SECRET || "secret";

export const authenticate = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    logger.warn("❌ Aucun header Authorization fourni");
    res.status(401).json({ error: "Token manquant" });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET) as TokenPayload;
    logger.info(`✅ Token valide - utilisateur: ${decoded.email}`);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error("❌ Token invalide ou expiré", { error });
    res.status(401).json({ error: "Token invalide" });
  }
};

export const authorizeAdmin = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.email !== "admin@admin.com") {
    logger.warn(
      `❌ Accès refusé pour l’utilisateur non-admin : ${req.user?.email}`
    );
    return res.status(403).json({ error: "Accès refusé" });
  }

  logger.info(`🛡️ Accès admin autorisé pour : ${req.user.email}`);
  next();
};
