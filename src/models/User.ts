import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export interface User {
  relatedWalletAddress: string;
  publicKey: string;
  encryptedPrivateKey: string;
  randomNonce: string;
}

// 2. Create a Schema corresponding to the document interface.
export const UserSchema = new Schema<User>({
  relatedWalletAddress: { type: String, required: true },
  publicKey: { type: String },
  encryptedPrivateKey: { type: String },
  randomNonce: { type: String, required: true },
});

// 3. Create a Model.
const User = model<User>("User", UserSchema);

export default User;
