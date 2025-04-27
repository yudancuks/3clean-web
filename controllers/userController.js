//controllers/productController.js

const axios = require('axios');
const BACKEND_API = process.env.BACKEND_API || 'https://3cleaningsydney.com:3000/api'; // Replace with your backend URL

exports.renderUserList = async (req, res) => {
    try {

        const response = await axios.get(`${BACKEND_API}/users`);
        const users = response.data;
        console.log(users);
        res.render('contents/users/user-list', { users });
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};

exports.renderUserCreate = async (req, res) => {
    try {
        res.render('contents/users/user-post');
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};

exports.renderUserEdit = async (req, res) => {
    try {
        const { id } = req.params; // Extract id from request parameters
        // Fetch discount data from the API
       const response = await axios.get(`${BACKEND_API}/users/${id}`);
        
       // Extract discount data
       const user = response.data;

       console.log(user);
       
       // Render the view and pass the discount data
       res.render('contents/users/user-post', { user });
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params; // Extract product ID from request parameters

        // Send delete request to the backend
        await axios.delete(`${BACKEND_API}/users/${id}`);

        // Redirect to the product list or send a success response
        res.redirect('/peoples/admin-list');
    } catch (err) {
        console.error(err.message);

        // Handle errors gracefully
        res.status(500).send({
            error: 'Failed to delete the product. Please try again later.',
            details: err.message
        });
    }
};
