import tmdbConfig from "./tmdb.config";

//passes into getUrl = (endpoint, params) for each 
const tmdbEndpoints = {
    mediaList: ({ mediaType, mediaCategory, page}) => tmdbConfig.getUrl(
        `$${mediaType}/${mediaCategory}`, page
    ),
    mediaDetail: ({ mediaType, mediaId}) => tmdbConfig.getUrl(
        `$${mediaType}/${mediaId}`
    ),
    mediaGenres: ({mediaType}) => tmdbConfig.getUrl(
        `genre/${mediaType}/List`
    ),
    mediaCredits: ({ mediaType, mediaId }) => tmdbConfig.getUrl(
        `${mediaType}/${mediaId}/credits`
    ),
    mediaVideos: ({ mediaType, mediaId}) => tmdbConfig.getUrl(
        `${mediaType}/${mediaId}/videos`
    ),
    mediaRecommend: ({ mediaType, mediaId}) => tmdbConfig.getUrl(
        `${mediaType}/${mediaId}/recommendations`
    ),
    mediaImages: ({ mediaType, mediaId}) => tmdbConfig.getUrl(
        `${mediaType}/${mediaId}/images`
    ),
    mediaSearch: ({ mediaType, query, page }) => tmdbConfig.getUrl(
        `search/${mediaType}`, { query, page}
    ),
    personDetail: ({ personId }) => tmdbConfig.getUrl(
        `person/${personId}`
    ),
    personMedias: ({ personId }) => tmdbConfig.getUrl(
        `person/${personId}/combined_credits`
    )
};

export default tmdbEndpoints;