import { inventoryStatus, PrismaClient } from "@prisma/client";
import products from "./data/products.json";
const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();
  for (const product of products) {
    try {
      await prisma.product.create({
        data: {
          id: product.id,
          code: product.code,
          name: product.name,
          description: product.description,
          image: product.image,
          price: product.price,
          category: product.category,
          createdAt: new Date(product.createdAt),
          updatedAt: new Date(product.updatedAt),
          shellId: product.shellId,
          internalReference: product.internalReference,
          inventoryStatus: product.inventoryStatus as inventoryStatus,
          rating: product.rating,
        },
      });
    } catch (e) {
      console.error(`Error seeding product ${product.code}:`, e);
    }
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
