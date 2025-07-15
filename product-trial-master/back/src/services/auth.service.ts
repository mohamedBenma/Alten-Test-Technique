import { PrismaClient } from "@prisma/client";
import { UserDto } from "../types/User.dto";
import { LoginDto } from "../types/Login.dto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import logger from "../utils/logger";

dotenv.config();
const SECRET = process.env.JWT_SECRET!;
const prisma = new PrismaClient();

export async function register(user: UserDto): Promise<UserDto[]> {
  logger.info(`Tentative d’enregistrement pour l’email : ${user.email}`);

  const newUser = await prisma.user.create({
    data: {
      username: user.username,
      firstname: user.firstname,
      email: user.email,
      password: await bcrypt.hash(user.password, 10),
    },
  });

  logger.info(
    `Nouvel utilisateur enregistré : ${newUser.email} (id: ${newUser.id})`
  );
  return [newUser];
}

export const loginUser = async (userCred: LoginDto) => {
  logger.info(`Tentative de connexion pour l’email : ${userCred.email}`);

  const user = await prisma.user.findUnique({
    where: { email: userCred.email },
  });
  if (!user) {
    logger.warn(
      `Échec de connexion : utilisateur introuvable (${userCred.email})`
    );
    throw new Error("Identifiants invalides");
  }

  const isMatch = await bcrypt.compare(userCred.password, user.password);
  if (!isMatch) {
    logger.warn(`Mot de passe incorrect pour l’utilisateur : ${user.email}`);
    throw new Error("Mot de passe incorrect");
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, SECRET, {
    expiresIn: "1h",
  });
  logger.info(`Connexion réussie pour l’utilisateur : ${user.email}`);

  return token;
};
