import { ProductsDbRepository } from '@/src/data/usecases/products-repository';
import { IValidator } from '@/src/domain/validators/validator';
import { IHttpResponse, badRequest, ok } from '../../helpers/http-helpers';

export class FindProductByIdService {
  private readonly productDbRepository: ProductsDbRepository;
  private readonly validator: IValidator<{id: string}>;

  constructor(
    productDbRepository: ProductsDbRepository, 
    validator: IValidator<{id: string}>
  ) {
    this.productDbRepository = productDbRepository,
    this.validator = validator;
  }

  async exec(id: string): Promise<IHttpResponse> {
    const isValid = this.validator.validate({id: id});
    if(!isValid){
      return badRequest(new Error('Id should be provided!'));
    }
    return ok(await this.productDbRepository.findById(id));
  }
}
