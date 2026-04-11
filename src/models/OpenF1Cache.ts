import mongoose, { Schema, Document } from 'mongoose';

export interface IOpenF1Cache extends Document {
  key: string;
  meeting_key: number;
  session_key: number;
  last_updated: Date;
}

const OpenF1CacheSchema: Schema = new Schema({
  key: { type: String, required: true, unique: true, default: 'latest_standings' },
  meeting_key: { type: Number, required: true },
  session_key: { type: Number, required: true },
  last_updated: { type: Date, default: Date.now },
});

export default mongoose.model<IOpenF1Cache>('OpenF1Cache', OpenF1CacheSchema);
