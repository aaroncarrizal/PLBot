import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  discordId: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  discordId: { type: String, required: true, unique: true },
});

export default mongoose.model<IUser>('User', UserSchema);