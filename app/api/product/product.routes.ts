import { Router } from 'express';
import { ProductController } from '@/app/api/product';

export class ProductRoutes {
  private router: Router;
  private productController: ProductController;

  constructor() {
    this.router = Router();
    this.productController = new ProductController();
    this.initializeRoutes();
  }

  // Defining the routes
  private initializeRoutes(): void {
    this.router.get('/dataset/:dataset', this.productController.getProductList);
    this.router.get('/:id/dataset/:dataset', this.productController.getProductById);
    this.router.get('/dataset/:dataset/search', this.productController.searchProduct);
  }

  // Method to get the router object
  public getRouter(): Router {
    return this.router;
  }
}
