//controllers/orderController.js

const axios = require('axios');
const BACKEND_API = process.env.BACKEND_API || 'http://3cleaningsydney.com/api'; // Replace with your backend URL

exports.renderList = async (req, res) => {
    try {
        const response = await axios.get(`${BACKEND_API}/orders`);
        const list = response.data;
        console.log(list);
        res.render('contents/orders/list', { list });
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};

exports.renderPost = async (req, res) => {
    try {
        const response = await axios.get(`${BACKEND_API}/packages`);
        const services = response.data;

        const respAddon = await axios.get(`${BACKEND_API}/addOns`);
        const addOns = respAddon.data;
        
        res.render('contents/orders/create',{services,addOns});
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};

exports.renderPut = async (req, res) => {
    try {
        const { id } = req.params; // Extract id from request parameters
       
        // Fetch discount data from the API
       const response = await axios.get(`${BACKEND_API}/orders/${id}`);

       const responser = await axios.get(`${BACKEND_API}/packages`);
        const services = responser.data;

        const respAddon = await axios.get(`${BACKEND_API}/addOns`);
        const addOns = respAddon.data;
        
       // Extract discount data
       const data = response.data;
       // Render the view and pass the discount data
       
       res.render('contents/orders/create', { data, services, addOns });
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};

exports.renderDelete = async (req, res) => {
    try {
        const { id } = req.params; // Extract product ID from request parameters

        // Send delete request to the backend
        await axios.delete(`${BACKEND_API}/packages/${id}`);

        // Redirect to the product list or send a success response
        res.redirect('/dashboard/services/list');
    } catch (err) {
        console.error(err.message);

        // Handle errors gracefully
        res.status(500).send({
            error: 'Failed to delete the product. Please try again later.',
            details: err.message
        });
    }
};

