import responseHandler from "../handlers/response.handler.js";
import favoriteModel from "../models/favorite.model.js";

const addFavorite = async (req, res) => {
    try {
        // finds users favorited items
        const isFavorite = await favoriteModel.findOne({
            user: req.user.id,
            mediaId: req.body.mediaId
        })

        //if already favorite, returns
        if (isFavorite) return responseHandler.ok(res, isFavorite)

        // else adds new favorite to the users favorite model where req.body is the media and goes to req.user.id (specific user)
        const favorite = new favoriteModel({
            ...req.body,
            user: req.user.id
        });

        await favorite.save();

        responseHandler.created(res, favorite);
    } catch {
        responseHandler.error(res);
    }
};

const removeFavorite = async (req, res) => {
    try {
        const { favoriteId } = req.params

        // searches for favorite model criteria below
        const favorite = await favoriteModel.findOne({
            user: req.user.id,
            _id: favoriteId
        })

        //if isnt favorited, "not found"
        if (!favorite) return responseHandler.notfound(res);

        // else remove
        await favorite.remove();

        responseHandler.ok(res);
    } catch {
        responseHandler.error(res);
    }
};

const getFavoriteOfUser = async (req, res) => {
    try {
        // finds all favorites of user in cronological order
        const favorite = await favoriteModel.find({ user: req.user.id }).sort("-createdAt");

        responseHandler.ok(res, favorite);
    } catch {
        responseHandler.error(res);
    }
};

export default { addFavorite, removeFavorite, getFavoriteOfUser };