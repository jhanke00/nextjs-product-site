type User = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password?: string;
};

type UserRouterContext = {
  params: {
    userId: string;
  };
};

export type { User, UserRouterContext };
