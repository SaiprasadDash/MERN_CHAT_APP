import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
        },
        image: {
            type: String,
        },
    },
    { timestamps: true }
);

// const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);
const Message = mongoose.model("Message", messageSchema) || mongoose.models.Message;

export default Message;