import mongoose from 'mongoose';
import { IUserDocument, IUserModel } from './user.types';
import UserSchema from './user.schema';

export const User = mongoose.model<IUserDocument, IUserModel>('User', UserSchema);
