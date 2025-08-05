const mysql2 = require('mysql2/promise')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()

const pool = mysql2.createPool({
    host: 'localhost',
    user: "root",
    password: "Toan2003@@",
    database: "cardtcg",
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 2
});

const LoginController = {
    viewUser: async (req, res) => {
        try {
            const { id } = req.params;
            const query = `SELECT user.ID, username, password, email, fullname, addrerss, phone 
            FROM User 
            JOIN userprofile 
            ON user.ID = userprofile.ID 
            WHERE user.ID = ?`;
            const [rows] = await pool.query(query, [id]);
            if (rows) {
                res.status(200).json(rows);
            }
            else {
                res.status(401).json("Database err")
            }
        } catch (error) {
            res.status(500).json(`Server err: ${error}`)
        }
    },
    detailUser: async (req, res) => {
        try {
            const { username, password } = req.body;
            const query = "SELECT * FROM User WHERE username = ?";
            const [result] = await pool.query(query, [username]);
            const user = result[0];
            const payload = {
                username: user?.username,
                email: user?.email,
                role : user?.idRole
            };
            if (!user) {
                return res.status(401).json({ message: "Tài khoản không tồn tại" });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Sai mật khẩu" });
            }
            const token = jwt.sign(payload, process.env.SECRET_KEY || "your-secret-key", { expiresIn: '6h' })
            return res.status(200).json({
                message: 'Đăng nhập thành công',
                token,
                idRole: user.idRole,
                user
            });
        } catch (error) {
            res.status(500).json(`Server err: ${error}`)
        }
    },
    addUser: async (req, res) => {
        try {
            const { username, password, email, idRole } = req.body;
            const query = "insert into user(username, password, email, idRole) values(?,?,?,?)";
                const hashPass = await bcrypt.hash(password, 10);
                const [result] = await pool.query(query, [username, hashPass, email, idRole]);
                if (result) {
                    const queryDetail = "INSERT INTO userprofile(ID, fullname, addrerss, phone) VALUES (?, 'X', 'X', '0000000000')"
                    await pool.query(queryDetail, [result.insertId]);
                    return res.status(200).json({ result, ID: result.insertId });
                } else {
                    return res.status(401).json("Database err");
                }
        } catch (error) {
            return res.status(500).json(`Server err: ${error}`)
        }
    },
    updateUser: async (req, res) => {
        try {
            const user = req.user;
            if(user){
                const { id } = req.params;
                const { fullname, addrerss, phone } = req.body;
                const query = "UPDATE userprofile SET fullname = ? , addrerss = ?, phone = ? WHERE ID = ?";
                const [result] = await pool.query(query, [fullname, addrerss, phone, id]);
            if (result) {
                res.status(200).json(result);
            }
            else {
                res.status(402).json("Bad request")
            }
            }
            else{
                res.status(400).json({message : "Không đủ quyền truy cập"})
            }
        } catch (error) {
            res.status(500).json(`Server err: ${error}`)
        }
    },
    updatePassword: async (req, res) => {
        try {
            const { id } = req.params;
            const { password } = req.body;
            const query = `UPDATE user SET password = ? WHERE ID = ?`;
            const bcryptPassword = await bcrypt.hash(password, 10);
            if(id){
                const [result] = await pool.query(query, [bcryptPassword, id]);
                if (result) {
                    res.status(200).json({ message: "Update thành công password", result });
                }
                else {
                    res.status(401).json("Database err")
                }
            }
        } catch (error) {
            res.status(500).json(`Server err: ${error}`)
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { username } = req.params.body;
            const query = "delete from User where username = ?";
            const [result] = pool.query(query, [username]);
            if (result) {
                res.status(200).json(result);
            }
            else {
                res.status(401).json("Database err")
            }
        } catch (error) {
            res.status(500).json(`Server err: ${error}`)
        }
    },
};
module.exports = LoginController;