import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, BAD_REQUEST, NOT_FOUND } from 'http-status';
import { ProductService } from '@/app/api/product';
import { commonConstants } from '@/src/constants';
import { ProductApiDatasetEnum } from '@/src/enums';

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  public getProductList = async (req: Request, res: Response): Promise<Response> => {
    const page = parseInt(req.query.page as string, 10) || commonConstants.pagination.defaultPage;
    const limit = parseInt(req.query.limit as string, 10) || commonConstants.pagination.defaultLimit;
    const dataset = req.params.dataset as ProductApiDatasetEnum;

    if (!dataset) {
      return res.status(BAD_REQUEST).json({ error: 'Product API Dataset is required' });
    }

    if (isNaN(page) || page <= 0) {
      return res.status(BAD_REQUEST).json({ error: 'Page must be a positive integer' });
    }

    if (isNaN(limit) || limit <= 0) {
      return res.status(BAD_REQUEST).json({ error: 'Limit must be a positive integer' });
    }

    try {
      const result = await this.productService.getProductList(dataset, { page, limit });
      return res.json(result);
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
    }
  };

  public getProductById = async (req: Request, res: Response): Promise<Response> => {
    const productId = req.params.id;
    const dataset = req.params.dataset as ProductApiDatasetEnum;

    if (!productId) {
      return res.status(BAD_REQUEST).json({ error: 'Product ID is required' });
    }

    if (!dataset) {
      return res.status(BAD_REQUEST).json({ error: 'Product API Dataset is required' });
    }

    try {
      const product = await this.productService.getSingleProduct(productId, dataset);
      if (!product) {
        return res.status(NOT_FOUND).json({ error: 'Product not found' });
      }
      return res.json(product);
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
    }
  };

  public searchProduct = async (req: Request, res: Response): Promise<Response> => {
    const searchQuery = req.query.q as string;
    const dataset = req.params.dataset as ProductApiDatasetEnum;

    if (!dataset) {
      return res.status(BAD_REQUEST).json({ error: 'Product API Dataset is required' });
    }

    if (!searchQuery || searchQuery.trim() === '') {
      return res.status(BAD_REQUEST).json({ error: 'Query parameter q is required and cannot be empty' });
    }

    try {
      const products = await this.productService.searchProduct(searchQuery, dataset);
      return res.json(products);
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
    }
  };
}
