import { Request, Response } from 'express';
import fs from 'fs';
const productsFilePath = './src/mock/large/products.json';

export class smallProductList {
  public static async get(res: Response) {
    try {
      const productsData = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
      res.send('Hi');
      // return res.status(200).json({ data: productsData, message: 'Success' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  public static async getById(req: Request, res: Response) {
    try {
      let productId: string = req.params.id; // Assuming userId is passed as a route parameter
      const productData = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
      const data = [...productData];
      const products = data.filter((product: any) => product.id === productId);
      return res.status(200).json({ data: { products }, message: 'Success' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  }
}
