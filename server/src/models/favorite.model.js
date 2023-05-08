import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

// export default mongoose.model(
//     "Favorite",
//     mongoose.Schema({
//         user: {
//             type: Schema.Types.ObjectId,
//             ref: "user",
//             required: true
//         },
//         mediaTyper: {
//             type: String,
//             enum: ["tv", "movie"],
//             required: true
//         },
//         mediaId: {
//             type: String,
//             required: true
//         },
//         mediaTitle: {
//             type: String,
//             required: true
//         },
//         mediaPoster: {
//             type: String,
//             required: true
//         },
//         mediaRate: {
//             type: Number,
//             required: true
//         },
//     }, modelOptions)
// )

const favoriteSchema = new mongoose.Schema({
        user: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        mediaType: {
            type: String,
            enum: ["tv", "movie"],
            required: true
        },
        mediaId: {
            type: String,
            required: true
        },
        mediaTitle: {
            type: String,
            required: true
        },
        mediaPoster: {
            type: String,
            required: true
        },
        mediaRate: {
            type: Number,
            required: true
        },
    }, modelOptions);

const favoriteModel = mongoose.model("Favorite", favoriteSchema);

export default favoriteModel;