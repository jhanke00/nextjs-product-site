import express, { Application } from 'express';
import { ProductRoutes } from '@/app/api/product';

export class App {
  public app: Application;
  private port: number | string;
  private productRoutes: ProductRoutes;

  constructor(port: number | string) {
    this.app = express();
    this.port = port;
    this.productRoutes = new ProductRoutes();

    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  // Middleware setup
  private initializeMiddlewares(): void {
    this.app.use(express.json());
  }

  // Route setup
  private initializeRoutes(): void {
    this.app.use('/api/product', this.productRoutes.getRouter()); // Using the router from ProductRoutes class
  }

  // Server listener
  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
