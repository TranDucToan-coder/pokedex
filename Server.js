require('dotenv').config();

const mysql2 = require('mysql2/promise')
const express = require('express')
const cor = require('cors');
const redis = require('redis')

const port = 5000;
const LoginRoutes = require('./Routes/LoginRoutes')
const CartRoutes = require('./Routes/CartRoutes')
const OrderRoutes = require('./Routes/OrderRoutes');
const AdminRoutes = require('./Routes/AdminRoutes')

const app = express();
app.use(cor());
app.use(express.json())

//sql
const pool = mysql2.createPool({
    host: 'localhost',
    user: "root",
    password: "Toan2003@@",
    database: process.env.API_DATABASE || "cardtcg",
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 2
});
//redis
const redisClient = redis.createClient({
    url: `redis://default:${process.env.PASS_REDIS}@redis-18454.c11.us-east-1-3.ec2.redns.redis-cloud.com:18454`
});
redisClient.on('connect', () => {
    console.log("Connected to Redis!");
})
redisClient.on('error', (err) => {
    console.log('Redis Client Error', err)
})
//connect
async function connect() {
    try {
        await pool.getConnection();
        await redisClient.connect();
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
app.use("/order", OrderRoutes);
app.use("/admin", AdminRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
module.exports = {pool, redisClient}