import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmbd/tmdb.api.js";
import userModel from "../models/user.model.js";
import favoriteModel from "../models/favorite.model.js";
import reviewModel from "../models/review.model.js";
import tokenDecoded from "../middlewares/token.middleware.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const getList = async (req, res) => {
    try {
        // req.query contains property for each query string parameter in the route (QUERY BASED PROPERTIES)
        // eg, http://localhost:3000/user?name=Gourav&age=11 will output a user object with name: Gourav and age: 11
        const { page } = req.query;

        // req.params contains route parameters
        // eg. using same url, output would be "user"
        const { mediaType, mediaCategory } = req.params;

        // wait for response from TMBD client to get info (../tmbd/tmdb.api.js)
        const response = await tmdbApi.mediaList({ mediaType, mediaCategory, page });

        // returns 200 response as well as needed data
        return responseHandler.ok(res, response);
    } catch {
        responseHandler.error(res);
    }
};

const getGenres = async (req, res) => {
    try{
        const { mediaType } = req.params;

        const response = await tmdbApi.mediaGenres({ mediaType });

        return responseHandler.ok(res, response);

    } catch {
        responseHandler.error(res);
    }
};

const search = async (req, res) => {
    try {
        const { mediaType } = req.params;
        const { query, page } = req.query;

        const response = await tmdbApi.mediaSearch({
            query,
            page,
            mediaType: mediaType === "people" ? "person" : mediaType
        });

        responseHandler.ok(res, response);
    } catch {
        responseHandler.error(res);
    }
};

const getDetail = async (req, res) => {
    try {
        const { mediaType, mediaId } = req.params;

        const media = await tmdbApi.mediaDetail({ mediaType, mediaId });

        media.credits = await tmdbApi.mediaCredits({ mediaType, mediaId });

        const videos = await tmdbApi.mediaVideos({ mediaType, mediaId });

        media.videos = videos;

        const recommend = await tmdbApi.mediaRecommend({ mediaType, mediaId });

        media.recommend = recommend.results
        
        media.images = await tmdbApi.mediaImages({ mediaType, mediaId });

        const tokenDecoded = tokenMiddleware.tokenDecode(req);

        if (tokenDecoded) {
            const user = await userModel.findById(tokenDecoded.data)

            if (user) {
                const isFavorite = await favoriteModel.findOne({ user: user.id, mediaId })
                media.isFavorite = isFavorite !== null
            }
        }

        // populates review model by user and sorts
        media.reviews = await reviewModel.find({ mediaId }).populate("user").sort("-createdAt");

        responseHandler.ok(res, media);
    } catch {
        responseHandler.error(res);
    }
};

export default { getList, getGenres, search, getDetail };
