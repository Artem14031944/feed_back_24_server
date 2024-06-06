import jwt from "jsonwebtoken";

class TokenService {
    generateToken(id, email, role) {
        const token = jwt.sign({ id, email, role }, process.env.JWT_SECRET_ACCESS_TOKEN, { expiresIn: '24h'});
        return { token };
    }
}

export default new TokenService();