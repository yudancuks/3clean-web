//controllers/orderController.js

const axios = require('axios');
const BACKEND_API = process.env.BACKEND_API || 'http://3cleaningsydney.com:3000/api'; // Replace with your backend URL

exports.renderList = async (req, res) => {
    try {
        const response = await axios.get(`${BACKEND_API}/orders`);
        const list = response.data;
        console.log(list);
        res.render('contents/invoices/list', { list });
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};


exports.renderInvoice = async (req, res) => {
    try {
        const { id } = req.params; // Extract invoice ID from request parameters

        // Fetch invoice file from backend API
        const response = await axios({
            url: `${BACKEND_API}/invoice/generate/${id}`,
            method: 'GET',
            responseType: 'stream', // Ensure we get the response as a stream
        });

        // Set proper headers for file download
        res.setHeader('Content-Disposition', `attachment; filename=invoice-${id}.pdf`);
        res.setHeader('Content-Type', 'application/pdf');

        // Pipe the file stream to the response
        response.data.pipe(res);
    } catch (err) {
        console.error(err.message);

        // Handle errors gracefully
        res.status(500).send({
            error: 'Failed to download the invoice. Please try again later.',
            details: err.message
        });
    }
};

