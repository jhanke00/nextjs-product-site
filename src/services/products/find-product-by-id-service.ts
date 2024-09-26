import { ProductsDbRepository } from '@/src/data/usecases/products-repository';

class FindProductByIdService {
  constructor(private readonly productDbRepository: ProductsDbRepository) {}

  async exec(id: string) {
    const response = await this.productDbRepository.findById(id);
  }
}
