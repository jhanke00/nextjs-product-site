import type { NextApiResponse } from 'next';
import { CustomNextApiUserRequest } from '@/src/type/customUserRequest';
import User from '@/models/User';
import dbConnect from '@/src/utils/dbConnect';
import authMiddleware from '@/src/utils/middlewares/authMiddleware';
import * as Yup from 'yup';
import { formatValidationErrors, FormattedErrors } from '@/src/utils/commonUtilities';

const schema = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .min(6, 'New password must be at least 6 characters long')
    .required('New password is required'),
});

async function handler(req: CustomNextApiUserRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'PUT':
      try {
        await schema.validate(req.body, { abortEarly: false });

        const user = await User.findById(req.userId);

        if (!(await user.comparePassword(req.body.currentPassword))) {
          return res.status(400).json({ error: 'Current password is incorrect' });
        }

        user.password = req.body.newPassword;
        await user.save();

        res.status(204).end();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const formattedErrors: FormattedErrors = formatValidationErrors(error);

          return res.status(422).json({
            error: 'Validation Error',
            details: formattedErrors,
          });
        }

        console.error(error);
        res.status(500).json({ error: 'Internal Server Error. Please try again.' });
      }

    default:
      res.setHeader('Allow', ['PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default authMiddleware(handler);
