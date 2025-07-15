import { inventoryStatus } from "@prisma/client";

export interface CreateProductDto {
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  shellId: number;
  internalReference: string;
  inventoryStatus?: inventoryStatus;
  rating: number;
}