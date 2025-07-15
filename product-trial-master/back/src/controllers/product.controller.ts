import { RequestHandler } from 'express';
import * as productService from '../services/product.service';


export const getAllProducts: RequestHandler = async (req, res) => {
  try {
    const products = await productService.getAll();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProductById: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const product = await productService.getById(id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createProduct: RequestHandler = async (req, res) => {
  console.log('Creating product with data:', req.body);
  try {
    const now = new Date();
    const productInput = {
      ...req.body,
      createdAt: now,
      updatedAt: now,
    };
    const product = await productService.create(productInput);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

export const updateProduct: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const updated = await productService.update(id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Invalid update data' });
  }
};

export const deleteProduct: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const deleted = await productService.remove(id);
    if (!deleted) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
