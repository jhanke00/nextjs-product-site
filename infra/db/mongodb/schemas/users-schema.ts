import mongoose, { Schema } from 'mongoose';
import { IUser } from '@/src/domain/models';

const UserSchema: Schema<IUser> = new Schema({
  _id: { type: String, required: true, unique: true },
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

const User =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;

