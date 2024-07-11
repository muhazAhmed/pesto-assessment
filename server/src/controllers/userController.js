import userModel from "../models/userModel.js";
import { GenJWT } from "../utils/commonFunctions.js";
import { EMAIL_EXISTS, PASSWORD_INCORRECT, REQUIRE_FIELD, RESPONSE_MESSAGE } from "../utils/validation.js";
import bcrypt from "bcrypt";

export const newUser = async (req, res) => {
    try {
        const data = req.body;
        const { name, email, password } = data;

        if (!name) return res.status(400).json({ message: REQUIRE_FIELD("Name") });
        if (!email) return res.status(400).json({ message: REQUIRE_FIELD("Email") });
        if (!password) return res.status(400).json({ message: REQUIRE_FIELD("Password") });

        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);

        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: EMAIL_EXISTS() });
        } else {
            const createUser = await userModel.create(data);
            return res.status(201).json({ createUser, message: RESPONSE_MESSAGE("User").USER_REGISTER });
        }

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: RESPONSE_MESSAGE("").SERVER_ERROR });
    }
}

export const loginUser = async (req, res) => {
    try {
        const data = req.body;
        const { email, password } = data;

        if (!email) return res.status(400).json({ message: REQUIRE_FIELD("Email") });
        if (!password) return res.status(400).json({ message: REQUIRE_FIELD("Password") });

        let user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: PASSWORD_INCORRECT() });
        }

        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(401).json({ message: PASSWORD_INCORRECT() });
        }

        const token = GenJWT(user);

        return res.status(200).json({ user, token, message: RESPONSE_MESSAGE("User").USER_LOGIN })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: RESPONSE_MESSAGE("").SERVER_ERROR });
    }
}

export const fetchOneUser = async (req, res) => {
    try {
        const fetchUser = await userModel.findOne({ _id: req.params.id });
        if (!fetchUser) return res.status(400).json({ message: REQUIRE_FIELD("").NO_USER_FOUND })

        return res.status(200).json(fetchUser);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: RESPONSE_MESSAGE("").SERVER_ERROR });
    }
}