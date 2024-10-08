import type { NextApiRequest, NextApiResponse } from 'next';
import User from '@/src/models/User';
import dbConnect from '@/src/utils/dbConnect';
import * as Yup from 'yup';
import response from '@/src/utils/response';

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
          return res.status(409).json({ message: `email ${req.body.email} already exists` });
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
        response.error(res, error as Error);
      }

    default:
      response.methodNotAllowed(res, req.method as string, ['POST']);
  }
}
