const mysql2 = require('mysql2/promise')

const pool = mysql2.createPool({
    host: 'localhost',
    user: "root",
    password: "Toan2003@@",
    database: "cardtcg",
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 2
});

const CartController = {
    addCart : async(req, res) => {
        try {
            const {IdUser, OrderDate, total} = req.body;
            const queryInsertCart = `INSERT INTO cart(IdUser, OrderDate, total) VALUES(?,?,?)`;
            const [results] = await pool.query(queryInsertCart, [IdUser, OrderDate, total]);
            return res.status(200).json({
                results,
                ID : results.insertId,
            })
        } catch (error) {
            res.status(500).json(`Server err: ${error}`)
        }
    },
    addDetailCart : async(req, res) => {
        try {
            const {ID, IdItem, Quantity, Price} = req.body;
            const queryInsertDetail = `INSERT INTO 
            detailcart(ID, IdItem, Quantity, Price) 
            VALUES(?,?,?,?)`;
            if(Quantity < 0){
                return res.status(400).json("Số lượng không hợp lệ!");
            }
            else{
                const [result] = await pool.query(queryInsertDetail, [ID, IdItem, Quantity, Price]);
                return(res.status(200).json(result))
            }
        } catch (error) {
            res.status(500).json(`Server err: ${error}`)
        }
    }
};
module.exports = CartController;