import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options";

// export default mongoose.model(
//     "Review",
//     mongoose.Schema({
//         user: {
//             type: Schema.Types.ObjectId,
//             ref: "user",
//             required: true
//         },
//         content: {
//             type: String,
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
//     }, modelOptions)
// );

const reviewSchema = new mongoose.Schema({
        user: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        content: {
            type: String,
            required: true
        },
        mediaTyper: {
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
    }, modelOptions);

const reviewModel = mongoose.model("Review", reviewSchema);

export default reviewModel;