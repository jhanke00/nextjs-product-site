import { NextApiRequest, NextApiResponse } from 'next';

export type ControllerConfig = Partial<Record<HttpMethod, Handler>>;

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options' | 'head' | 'connect' | 'trace';

type Handler = (request: NextApiRequest, response: NextApiResponse) => Promise<void>;

export const createController =
  (config: ControllerConfig) => async (request: NextApiRequest, response: NextApiResponse) => {
    const method = request.method?.toLowerCase() as HttpMethod | undefined;

    const handler = method && config[method];

    const methodIsDefined = handler !== undefined;

    if (!methodIsDefined) {
      response.status(405).send({ message: 'Method not allowed!' });
      return;
    }

    return await handler(request, response);
  };
