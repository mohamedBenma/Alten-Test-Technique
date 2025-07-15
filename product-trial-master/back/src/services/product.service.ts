import { PrismaClient, Prisma } from "@prisma/client";
import { Product } from "@prisma/client";
import logger from "../utils/logger";

const prisma = new PrismaClient();

export async function getAll(): Promise<Product[]> {
  logger.info("Récupération de tous les produits");
  return prisma.product.findMany();
}

export async function getById(id: number): Promise<Product | null> {
  logger.info(`Récupération du produit avec l'id : ${id}`);
  return prisma.product.findUnique({ where: { id } });
}

export async function create(
  data: Prisma.ProductCreateInput
): Promise<Product> {
  logger.info(`Création d’un nouveau produit : ${data.name}`);
  const product = await prisma.product.create({ data });
  logger.info(`Produit créé avec l’id : ${product.id}`);
  return product;
}

export async function update(
  id: number,
  data: Partial<Omit<Product, "id" | "createdAt">>
): Promise<Product | null> {
  logger.info(`Mise à jour du produit id=${id}`);

  try {
    const updated = await prisma.product.update({ where: { id }, data });
    logger.info(`Produit mis à jour : id=${updated.id}`);
    return updated;
  } catch (err: any) {
    logger.warn(`Échec de mise à jour : produit id=${id} introuvable`);
    return null;
  }
}

export async function remove(id: number): Promise<Product | null> {
  logger.info(`Suppression du produit id=${id}`);

  try {
    const deleted = await prisma.product.delete({ where: { id } });
    logger.info(`Produit supprimé : id=${deleted.id}`);
    return deleted;
  } catch (err: any) {
    logger.warn(`Échec de suppression : produit id=${id} introuvable`);
    return null;
  }
}
