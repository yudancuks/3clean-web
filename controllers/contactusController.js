//controllers/contactusController.js

const axios = require('axios');
const BACKEND_API = process.env.BACKEND_API || 'http://localhost:3000/api'; // Replace with your backend URL

exports.renderMessageList = async (req, res) => {
    try {

        const response = await axios.get(`${BACKEND_API}/contactus/messages`);
        const messages = response.data.messages;

        res.render('contents/contactus/message-list', { messages });
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};
