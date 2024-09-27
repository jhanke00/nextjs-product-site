import type { NextApiRequest, NextApiResponse } from 'next';
import User from '@/models/User';
import dbConnect from '@/src/utils/dbConnect';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import { formatValidationErrors, FormattedErrors } from '@/src/utils/commonUtilities';

const schema = Yup.object().shape({
  email: Yup.string().email('Email must be valid').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        await schema.validate(req.body, { abortEarly: false });

        const user = await User.findOne({ email: req.body.email });

        if (!user || !(await user.comparePassword(req.body.password))) {
          return res.status(401).json({ error: `Invalid credentials` });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1w' });

        res.status(200).json({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token,
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
