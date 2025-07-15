-- CreateEnum
CREATE TYPE "inventoryStatus" AS ENUM ('INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "internalReference" TEXT NOT NULL,
    "shellId" INTEGER NOT NULL,
    "inventoryStatus" "inventoryStatus" NOT NULL DEFAULT 'INSTOCK',
    "rating" INTEGER NOT NULL,
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
