import { Schema, model, mongoose } from "mongoose";

const ticketSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    }
})

export default model ('Ticket', ticketSchema);