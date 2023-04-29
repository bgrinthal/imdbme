import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handlers.js";
import userModel from "../models/user.model.js";

const tokenDecode = (req) => {
    try {
        const bearerHeader = req.headers["authorization"]

        if (bearerHeader) {
            const token = bearerHeader.split(" ")[1]
            console.log(token);

            return jsonwebtoken.verify(
                token,
                process.env.TOKEN_SECRET
            )
        }

        return false;
    } catch {
        return false;
    }
}

const auth = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req)

    // if tokenDecoded is not found, display unauthorized from our response handlers 
    if(!tokenDecoded) return responseHandler.unauthorized(res)

    // searches for user with id: tokenDecoded.data
    const user = await userModel.findById(tokenDecoded.data)

    // if user is not found, display unauthorized from our response handlers 
    if (!user) return responseHandler.unauthorized(res);

    req.user = user;

    // continues
    next();
};

export default { auth, tokenDecode };