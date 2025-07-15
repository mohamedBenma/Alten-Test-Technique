import { inventoryStatus } from "@prisma/client";

export interface UpdateProductDto {
  code?: string;
  name?: string;
  description?: string;
  image?: string;
  price?: number;
  category?: string;
  shellId?: number;
  internalReference?: string;
  inventoryStatus?: inventoryStatus;
  rating?: number;
}