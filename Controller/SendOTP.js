const dotenv = require('dotenv')
dotenv.config()

const nodemailer = require('nodemailer');
const redis = require('redis')

const redisClient = redis.createClient({
    url: `redis://default:EdlWGExyWPSkpCMaLIdjE96ClFeGB7Dq@redis-18454.c11.us-east-1-3.ec2.redns.redis-cloud.com:18454`
});
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ductoantran17@gmail.com',
        pass: process.env.PASS_APP
    }
});
const SendOTP = {
    CreateOTP: async (req, res) => {
        console.log(process.env.PASS_APP)
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        console.log("Gửi OTP tới:", email);
        const otp = Math.floor(100000 + Math.random() * 900000);
        try {
            await SendOTP.SendOTPtoAuth(email.trim(), otp);
            if (!redisClient.isOpen) {
                await redisClient.connect();
                await redisClient.set(`otp_${otp}`, otp, { EX: 300 });
            }
            res.status(200).json({
                message: "OTP sent",
                otp
            });
        } catch (error) {
            res.status(500).json({ message: "Gửi OTP thất bại", error: error.message });
        }
    },
    SendOTPtoAuth: async (to, otp) => {
        if (!to) throw new Error("No recipient email provided!");
        const mailOptions = {
            from: '"TCG" <ductoantran17@gmail.com>',
            to,
            subject: 'Your OTP',
            html: `<h3>Your OTP: ${otp}</h3>`
        };
        console.log("Mail options:", mailOptions); 
        await transporter.sendMail(mailOptions)
    },
    VerifyOTP: async (req, res) => {
    const { otp } = req.body;
    if (!otp) {
        return res.status(400).json({ message: "OTP is required" });
    }
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect();
        }
        const storedOtp = await redisClient.get(`otp_${otp}`);
        if (storedOtp && storedOtp === otp) {
            await redisClient.del(`otp_${otp}`);
            return res.status(200).json({ message: "OTP verified" });
        } else {
            return res.status(400).json({ message: "OTP is invalid or expired" });
        }
    } catch (error) {
        res.status(500).json({ message: "OTP verification failed", error: error.message });
    }
}
}
module.exports = SendOTP