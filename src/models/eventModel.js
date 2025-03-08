import { Schema, model } from "mongoose";

const eventSchema = new Schema({
    nameEvent: {
        type: String,
        required: true
    },
    dateEvent: {
        type: Date,
        required: true
    },
    availableSeats: {
        type: Number,
        required: true
    }
})

export default model ('Event', eventSchema);