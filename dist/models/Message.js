"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSchema = void 0;
const mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
exports.MessageSchema = new mongoose_1.Schema({
    from: { type: String, required: true, lowercase: true },
    to: { type: String, required: true, lowercase: true },
    text: { type: String, required: true },
    blockNumber: { type: Number, required: true },
});
// 3. Create a Model.
const Message = (0, mongoose_1.model)("Message", exports.MessageSchema);
exports.default = Message;
