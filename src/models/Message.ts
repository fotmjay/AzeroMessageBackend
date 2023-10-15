import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export interface Message {
  from: string;
  to: string;
  text: string;
  blockNumber: number;
}

// 2. Create a Schema corresponding to the document interface.
export const MessageSchema = new Schema<Message>({
  from: { type: String, required: true, lowercase: true },
  to: { type: String, required: true, lowercase: true },
  text: { type: String, required: true },
  blockNumber: { type: Number, required: true },
});

// 3. Create a Model.
const Message = model<Message>("Message", MessageSchema);

export default Message;
