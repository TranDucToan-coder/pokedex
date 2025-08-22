const dotenv = require('dotenv');
dotenv.config();

const axios = require('axios');
const crypto = require('crypto');
const QRCode = require('qrcode');
//required for Momo
const partnerCode = 'MOMO';
const accessKey = process.env.ACCESS_KEY;
const secretKey = process.env.SECRET_KEY;


const PaymentController = {
    CreatePayment: async (req, res) => {
        const endpoint = 'https://test-payment.momo.vn/v2/gateway/api/create';
        const orderId = Date.now().toString();
        const requestId = orderId;
        const { amount } = req.body;
        const orderInfo = 'Thanh toán MoMo';
        const redirectUrl = 'http://localhost:3000';
        const ipnUrl = 'http://localhost:3000/cart/payment';
        const extraData = '';

        const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=captureWallet`;
        const signature = crypto.createHmac('sha256', secretKey)
            .update(rawSignature)
            .digest('hex');

        const requestBody = {
            partnerCode,
            accessKey,
            requestId,
            amount,
            orderId,
            orderInfo,
            redirectUrl,
            ipnUrl,
            extraData,
            requestType: 'captureWallet',
            signature,
            lang: 'vi'
        };
        try {
            const response = await axios.post(endpoint, requestBody);
            const payUrl = response.data.payUrl;
            res.json({
                requestBody,
                payUrl
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    CheckStatus: async (req, res) => {
        try {
            const { orderId } = req.body;

        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    Transaction: async(req, res) => {
        try {
            const {orderId} = req.body;
            const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`
            const signature = crypto.createHmac("sha256", secretKey).update(rawSignature).digest(`hex`);

            const requestBody= {
                partnerCode:"MOMO",
                requestId: orderId,
                orderId : orderId,
                signature : signature,
                lang: 'vi'
            };
            const endpoint = 'https://test-payment.momo.vn/v2/gateway/api/query'
            const response = await axios.post(endpoint ,requestBody);
            res.status(200).json({
                response : response.data
            })
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};

module.exports = PaymentController;
