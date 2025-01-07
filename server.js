const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')(''); // استبدل بمفتاحك
const app = express();

app.use(bodyParser.json());

app.post('/charge', async (req, res) => {
    try {
        const { payment_method_id, feature } = req.body;
        let amount = 0;

        // تحديد المبلغ بناءً على الميزة المختارة
        switch (feature) {
            case 'report':
                amount = 1000; // 10 دولار
                break;
            case 'tips':
                amount = 500; // 5 دولار
                break;
            case 'horoscope':
                amount = 1500; // 15 دولار
                break;
            default:
                throw new Error('الميزة غير معروفة');
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            payment_method: payment_method_id,
            confirm: true,
        });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(3000, () => console.log('الخادم يعمل على port 3000'));