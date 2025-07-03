const mysql2 = require('mysql2/promise')
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

const OrderController = {
    OrderByUser : async(req, res) => {
        const { id } = req.params;
        const query = `
            SELECT cart.ID, IdUser, OrderDate, IdItem, Quantity, Price 
            FROM cart 
            JOIN detailcart 
            ON cart.ID = detailcart.ID 
            WHERE cart.IdUser = ?`;
        const [rows] = await pool.query(query, [id]);
        if(rows){
            return res.status(200).json(rows);
        }
        else
            return res.status(401).json("Database already has errored")
    }
}
module.exports = OrderController