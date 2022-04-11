import jwt from "jsonwebtoken";
import authConfig from "../config/auth";
import User from "../models/User";
import { checkPassword } from "../services/auth";

class SessionsController {
    
    async create (req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ email})

        if(!user) {
            return res.status(401).json({ error: "User / Password not found" });
        }

        if(!checkPassword(user, password)) {
            return res.status(401).json({ error: "User / Password not found" });
        }

        const { id } = user;

        return res.json({
            user: {
                id, 
                email
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            })
        });
    }
}

export default new SessionsController();