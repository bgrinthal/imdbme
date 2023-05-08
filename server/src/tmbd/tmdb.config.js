const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_KEY;

// passing in URL endpoint and params, will search for URL parameters ex: http://127.0.0.1:5500/?name=john&age=22.  Params being name and age
// returns whole api endpoint for desired info
const getUrl = (endpoint, params) => {
    const qs = new URLSearchParams(params)

    return `${baseUrl}${endpoint}?api_key${key}&${qs}`;
};

export default { getUrl };