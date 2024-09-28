import { ProductsDbRepository } from '@/src/data/usecases/products-repository';
import { IHttpResponse, ok } from '../../helpers/http-helpers';

export class GetAllProductsService {
  private readonly productDbRepository: ProductsDbRepository;

  constructor(productDbRepository: ProductsDbRepository) {
    this.productDbRepository = productDbRepository;
  }

  async exec(page?: string, limit?: string): Promise<IHttpResponse> {
    return ok(await this.productDbRepository.getAll(page, limit));
  }
}
