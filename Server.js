require('dotenv').config();
console.log(process.env.SECRET_KEY)

const mysql2 = require('mysql2/promise')
const express = require('express')
const cor = require('cors');


const port = 5000;
const LoginRoutes = require('./Routes/LoginRoutes')
const CartRoutes = require('./Routes/CartRoutes')

const app = express();
app.use(cor());
app.use(express.json())

const pool = mysql2.createPool({
    host: 'localhost',
    user: "root",
    password: "Toan2003@@",
    database: process.env.API_DATABASE || "cardtcg",
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 2
});
async function connect() {
    try {
        await pool.getConnection();
        console.log("Database is connected!");
    } catch (err) {
        console.log("Error: " + err);
        return null;
    }
}
connect();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/login", LoginRoutes);
app.use("/cart", CartRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
module.exports = pool