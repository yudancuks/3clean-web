//controllers/cleanerController.js

const axios = require('axios');
const BACKEND_API = process.env.BACKEND_API || 'http://3cleaningsydney.com/api'; // Replace with your backend URL
const moment = require('moment');

exports.renderUserList = async (req, res) => {
    try {

        const response = await axios.get(`${BACKEND_API}/cleaner`);
        let users = response.data;
        users = users.map(user => ({
            ...user,
            dob: user.dob ? moment(user.dob).format('DD MMMM YYYY') : 'N/A' // Handle missing DOB
        }));
        res.render('contents/cleaner/user-list', { users });
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};

exports.renderUserCreate = async (req, res) => {
    try {
        res.render('contents/cleaner/user-post');
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};

exports.renderUserEdit = async (req, res) => {
    try {
        const { id } = req.params; // Extract id from request parameters
        // Fetch discount data from the API
       const response = await axios.get(`${BACKEND_API}/cleaner/${id}`);
        
       // Extract discount data
       const user = response.data;
       
       // Render the view and pass the discount data
       res.render('contents/cleaner/user-post', { user });
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params; // Extract product ID from request parameters

        // Send delete request to the backend
        await axios.delete(`${BACKEND_API}/cleaner/${id}`);

        // Redirect to the product list or send a success response
        res.redirect('/peoples/cleaner-list');
    } catch (err) {
        console.error(err.message);

        // Handle errors gracefully
        res.status(500).send({
            error: 'Failed to delete the data. Please try again later.',
            details: err.message
        });
    }
};
