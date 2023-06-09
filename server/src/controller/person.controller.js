import responseHandler from "../handlers/response.handler";
import tmdbApi from "../tmbd/tmdb.api.js"

const personDetail = async (res, req) => {
    try {
        const {personId} = req.params

        const person = await tmdbApi.personDetail({ personId })

        responseHandler.ok(res, person);
    } catch {
        responseHandler.error(res);
    }
};

const personMedias = async (res, req) => {
    try {
        const {personId} = req.params
        
        const medias = await tmdbApi.personMedias({ personId });
    } catch {
        responseHandler.error(req);
    }
};

export default { personDetail, personMedias };