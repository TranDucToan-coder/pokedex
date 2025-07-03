const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const MiddlewareController = {
    middleware: async (req, res, next) => {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token không tồn tại' });
            }
            jwt.verify(token, process.env.SECRET_KEY || 'your-secret-key', (err, user) => {
                if (err) return res.status(403).json({ message: 'Token không hợp lệ' });
                req.user = user;
                next();
            });
        } catch (error) {
            res.status(500).json({ message: `Lỗi máy chủ: ${error.message}` });
        }
    }
}

module.exports = MiddlewareController