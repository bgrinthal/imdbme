import responseHandler from "../handlers/response.handler.js";
import reviewModel from "../models/review.model";

const create = async (req, res) => {
    try {
        // object destructure setting req.params to movieId
        const { movieId } = req.params

        //  create a new instance of reviewModel
        const review = await new reviewModel({
            user: req.user.id,
            movieId, 
            ...req.body
        })

        await review.save();

        // sends response with given info
        responseHandler.created(res, {
            ...review._doc,
            id: review.id,
            user: req.user
        });
    } catch {
        responseHandler.error(res);
    }
};

const remove = async (req, res) => {
    try {
        const { reviewId } = req.params

        // looks for review with given information
        const review = await reviewModel.findOne({
            _id: reviewId,
            user: req.user.id
        })

        // if cannot find
        if (!review) return responseHandler.notfound(res)

        await review.remove();

        responseHandler.ok(res);

    } catch {
        responseHandler.error(res)
    }
};

const getReviewsOfUser = async (req, res) => {
    try {
        // finds all of the reviews of given user
        const reviews = await reviewModel.find({
            user: req.user.id,
        }).sort("-createdAt");

        responseHandler.ok(res);
    } catch {
        responseHandler.error(res);
    }
};

export default { create, remove, getReviewsOfUser };