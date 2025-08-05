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

const AdminController = {
    //Status
    GetStatus : async(req, res) => {
        try {
            const query = `SELECT * FROM status`
            const [rows] = await pool.query(query)
            if(rows){
                return res.status(200).json(rows);
            }
            else{
                return res.status(403).json({message: "Forbidden"})
            }
        } catch (error) {
            return res.status(500).json({message: "Interval Server!"})
        }
    },
    //Account
    GetAccount : async (req, res) => {
        try {
            const query = `SELECT ID, username, email, idRole`
            const [rows] = await pool.query(query);
            if(rows){
                return res.status(200).json(rows);
            }
            else{
                return res.status(403).json({message: "Forbidden"})
            }
        } catch (error) {
            return res.status(500).json({message: "Interval Server!"})
        }
    },
    GetMethod : async (req, res) => {
        try {
            const query = `SELECT * FROM method`
            const [rows] = await pool.query(query)
            if(rows){
                return res.status(200).json(rows);
            }
            else{
                return res.status(403).json({message: "Forbidden"})
            }
        } catch (error) {
            return res.status(500).json({message: "Interval Server!"})
        }
    } ,
    GetDataCart : async (req, res) => {
        try {
            
        } catch (error) {
            
        }
    }
}
module.exports = AdminController
