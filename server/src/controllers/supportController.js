import supportModel from "../models/supportModel.js";
import { REQUIRE_FIELD, RESPONSE_MESSAGE } from "../utils/validation.js";

export const newMessage = async (req, res) => {
    try {
        const data = req.body;
        const { name, email, message, userId } = data;

        if (!name) return res.status(400).json(REQUIRE_FIELD("Name"));
        if (!email) return res.status(400).json(REQUIRE_FIELD("Email"));
        if (!message) return res.status(400).json(REQUIRE_FIELD("Message"));

        await supportModel.create(data);
        return res.status(201).json({message: RESPONSE_MESSAGE("").NEW_MESSAGE});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
};
