import { allMockUsers } from '@/src/mock/helpers/allMockUsers';
import { createController } from '@/src/utils/createController';
import { NextApiRequest, NextApiResponse } from 'next';

const getHandler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query;

  const existingUsers = allMockUsers;

  const selectedUser = existingUsers.find((user) => user.id === id) ?? null;

  response.json(selectedUser);
  return;
};

export default createController({
  get: getHandler,
});
