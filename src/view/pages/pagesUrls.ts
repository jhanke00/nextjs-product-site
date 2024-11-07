import { env } from '@/src/config/env';
import { User } from '@/src/domain/user/User';

export const pagesUrls = (() => {
  type UserPageParameters = {
    userId: User['id'];
    page: number;
    perPage: number;
  };

  const baseUrl = env.NEXT_PUBLIC_APP_BASE_URL;

  const user = ({ page, perPage, userId }: UserPageParameters) =>
    `${baseUrl}/users/${userId}?page=${page}&perPage=${perPage}`;

  return {
    user,
  };
})();
