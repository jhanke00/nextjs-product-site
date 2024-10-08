import mongoose, { CallbackError } from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { IUser } from '@/src/types/users';

interface IUserDocument extends IUser, Omit<mongoose.Document, '_id'> {
  _id: string;
}

const userSchema = new mongoose.Schema<IUserDocument>({
  _id: {
    type: String,
    default: () => crypto.randomUUID(),
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre<IUserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

userSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.models.User || mongoose.model<IUserDocument>('User', userSchema, 'User');
