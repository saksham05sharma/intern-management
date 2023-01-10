import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/index.mjs";
import { USER_ROLES } from "../models/User.mjs";
import { getUserById } from "../services/user.mjs";

const auth = async (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).json({ message: "Login to continue" });
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded.user;
        const foundUser = await getUserById(req.user.id);
        if (!foundUser.verified)
            return res.status(401).json({
                message: "You are not verified, wait for admin to verify you",
            });
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: "Token is not valid" });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        let foundUser = await getUserById(req.user.id);
        if (foundUser.role === USER_ROLES.ADMIN) next();
        else
            return res.status(403).json({
                message: "You are not authorized to access this route",
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const isIntern = async (req, res, next) => {
    try {
        let foundUser = await getUserById(req.user.id);
        if (foundUser.role === USER_ROLES.USER) next();
        else
            return res.status(403).json({
                message: "You are not authorized to access this route",
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const isVerified = async (req, res, next) => {
    try {
        let foundUser = await getUserById(req.user.id);
        if (foundUser.verified) next();
        else return res.status(403).json({ message: "You are not verified" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const verifyUserRole = (role) => async (req, res, next) => {
    let foundUser = await getUserById(req.user.id);
    try {
        if (typeof role === "string") {
            if (foundUser.role === role) next();
        } else if (role.includes(foundUser.role)) next();
        else
            res.status(403).json({
                message: "You are not authorized to access this route",
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default auth;
export { isAdmin, isIntern, verifyUserRole, isVerified };
