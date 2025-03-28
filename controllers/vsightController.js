//controllers/productController.js

const axios = require('axios');
const BACKEND_API = process.env.BACKEND_API || 'http://localhost:3000/api'; // Replace with your backend URL

exports.renderPostList = async (req, res) => {
    try {

        const response = await axios.get(`${BACKEND_API}/vsight`);
        const vsights = response.data.vsights;

        res.render('contents/blogs/post-list', { vsights });
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};

exports.renderPostCreate = async (req, res) => {
    try {
        res.render('contents/blogs/post-create');
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};

exports.renderBlogEdit = async (req, res) => {
    try {
        const { id } = req.params; // Extract id from request parameters
       
        // Fetch discount data from the API
       const response = await axios.get(`${BACKEND_API}/vsight/${id}`);
        
       // Extract discount data
       const vsight = response.data.vsight;
       // Render the view and pass the discount data
       
       let vsightCat;

       vsightCat = vsight.category
       res.render('contents/blogs/post-create', { vsight, vsightCat });
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.params; // Extract product ID from request parameters

        // Send delete request to the backend
        await axios.delete(`${BACKEND_API}/vsight/${id}`);

        // Redirect to the product list or send a success response
        res.redirect('/blogs/post-list');
    } catch (err) {
        console.error(err.message);

        // Handle errors gracefully
        res.status(500).send({
            error: 'Failed to delete the product. Please try again later.',
            details: err.message
        });
    }
};
