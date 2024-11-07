import { ApiUserMapper } from '@/src/infrastructure/api/mappers/ApiUserMapper';
import { allMockUsers } from '@/src/mock/helpers/allMockUsers';
import { sample } from 'lodash-es';

export const getSampleUser = () => {
  const sampleApiUser = sample(allMockUsers)!;

  const user = ApiUserMapper.fromApi(sampleApiUser);

  return user;
};
