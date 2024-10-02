import mongoose, { Schema } from 'mongoose';
import type { User } from '@type/users';

const userSchema: Schema = new Schema<User>({
  id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.models.User || mongoose.model<User>('User', userSchema);

export { UserModel };
