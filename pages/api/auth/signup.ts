import type { NextApiRequest, NextApiResponse } from 'next';
import User from '@/models/User';
import dbConnect from '@/src/utils/dbConnect';
import * as Yup from 'yup';
import { formatValidationErrors, FormattedErrors } from '@/src/utils/commonUtilities';

const schema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Email must be valid').required('Email is required'),
  phoneNumber: Yup.string().required('Phone Number is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        await schema.validate(req.body, { abortEarly: false });

        if (await User.findOne({ email: req.body.email })) {
          return res.status(409).json({ error: `email ${req.body.email} already exists` });
        }

        const user = new User(req.body);
        await user.save();

        res.status(201).json({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
        });
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
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
