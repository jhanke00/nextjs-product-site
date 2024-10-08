import type { NextApiResponse } from 'next';
import { CustomNextApiRequest } from '@/src/types/next';
import User from '@/src/models/User';
import dbConnect from '@/src/utils/dbConnect';
import authMiddleware from '@/src/utils/middlewares/auth';
import * as Yup from 'yup';
import response from '@/src/utils/response';

const schema = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .min(6, 'New password must be at least 6 characters long')
    .required('New password is required'),
});

async function handler(req: CustomNextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'PUT':
      try {
        await schema.validate(req.body, { abortEarly: false });

        const user = await User.findById(req.userId);

        if (!(await user.comparePassword(req.body.currentPassword))) {
          return res.status(400).json({ message: 'Current password is incorrect' });
        }

        user.password = req.body.newPassword;
        await user.save();

        res.status(204).end();
      } catch (error) {
        response.error(res, error as Error);
      }

    default:
      response.methodNotAllowed(res, req.method as string, ['PUT']);
  }
}

export default authMiddleware(handler);
