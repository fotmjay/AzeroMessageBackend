import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export interface Message {
  from: string;
  to: string;
  text: string;
  timestamp: number;
  explorerLink: string;
  encrypted: boolean;
}

// 2. Create a Schema corresponding to the document interface.
export const MessageSchema = new Schema<Message>({
  from: { type: String, required: true },
  to: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Number, required: true },
  explorerLink: { type: String, required: true },
  encrypted: { type: Boolean, default: false },
});

// 3. Create a Model.
const Message = model<Message>("Message", MessageSchema);

export default Message;
