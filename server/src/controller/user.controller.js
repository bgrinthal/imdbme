import userModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";

const signup = async (req, res) => {
    try {
        const {username, password, displayName } = req.body

        // checks if username exists
        const checkUser = await userModel.findOne({ username })

        if (checkUser) return responseHandler.badrequest(res, "username already exists")

        // creates new instance of user
        const user = new userModel ()

        user.displayName = displayName;
        user.username = username;
        user.setPassword(password);

        await user.save();

        // creates a token that expires in a day
        // syntax jwt.sign(payload, authCongif.secret, { expires: 24h })
        const token = jsonwebtoken.sign(
            { data: user.id },
            process.env.TOKEN_SECRET,
            { expires: "24h" }
        );

        // passes to response handler
        responseHandler.created(res, {
            token,
            ...user._doc,
            id: user.id
        });

    } catch {
        responseHandler.error(res);
    }
};

const signin = async (req, res) => {
    try {
        // saves to request body
        const { username, password } = req.body

        // .select method selects which fields to be displayed in query result.  This will excluse the password
        const user = await userModel.findOne({ username }).select("username password salt id displayName")

        // check if user exists
        if(!user) return responseHandler.badrequest(res, "User does not exist")

        // checks if password is valid
        if(!user.validPassword(password)) return responseHandler.badrequest(res, "Incorrect Password")

        // creates a token that expires in a day
        // syntax jwt.sign(payload, authCongif.secret, { expires: 24h })
        const token = jsonwebtoken.sign(
            { data: user.id },
            process.env.TOKEN_SECRET,
            { expires: "24h" }
        );

        user.password = undefined;
        user.salt = undefined;

        // passes to response handler
        responseHandler.created(res, {
            token,
            ...user._doc,
            id: user.id
        });

    } catch {
        responseHandler.error(res)
    } 
};

const updatePassword = async (req, res) => {
    try {

        const { password, newPassword } = req.body

        const user = await userModel.findById(req.user.id).select("password id salt")

        if (!user) return responseHandler.unauthorized(res)

        if(!user.validPassword(password)) return responseHandler.badrequest(res, "Wrong password")

        user.setPassword(newPassword)

        await user.save()

        responseHandler.ok(res);

    } catch {
        responseHandler.error(res);
    }
};

const getInfo = async (req, res) => {
    try {
        const user = await userModel.findById(req,user.id)

        if (!user) return responseHandler.notfound(res);

        responseHandler.ok(res, user);

    } catch {
        responseHandler.error(res)
    }
}

export default {
    signup,
    signin,
    getInfo,
    updatePassword
};