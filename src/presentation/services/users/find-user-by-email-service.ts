import { UsersDbRepository } from '@/src/data/usecases/users-repository';
import { IHttpResponse, ok } from '../../helpers/http-helpers';

export class FindUserByEmailService {
  private readonly usersDbRepository: UsersDbRepository;

  constructor(usersDbRepository: UsersDbRepository) {
    this.usersDbRepository = usersDbRepository;
  }
  async exec(email: string): Promise<IHttpResponse> {
    const userData = await this.usersDbRepository.findByEmail(email);

    return ok({
      _id: userData?._id || '',
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
      phoneNumber: userData?.phoneNumber || '',
      email: userData?.email || '',
    });
  }
}
