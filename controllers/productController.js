//controllers/productController.js

const axios = require('axios');
const BACKEND_API = process.env.BACKEND_API || 'http://localhost:3000/api'; // Replace with your backend URL

exports.renderProductList = async (req, res) => {
    try {

        const response = await axios.get(`${BACKEND_API}/products`);
        const products = response.data.products;

        res.render('contents/products/product-list', { products });
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};

exports.renderProductPost = async (req, res) => {
    try {
        res.render('contents/products/product-post');
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};

exports.renderProductEdit = async (req, res) => {
    try {
        const { slug } = req.params; // Extract slug from request parameters
       
        // Fetch product data from the API
       const response = await axios.get(`${BACKEND_API}/products/${slug}`);
        
       // Extract product data
       const product = response.data;

       // Render the view and pass the product data
       res.render('contents/products/product-post', { product });
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params; // Extract product ID from request parameters

        // Send delete request to the backend
        await axios.delete(`${BACKEND_API}/products/${id}`);

        // Redirect to the product list or send a success response
        res.redirect('/products/product-list');
    } catch (err) {
        console.error(err.message);

        // Handle errors gracefully
        res.status(500).send({
            error: 'Failed to delete the product. Please try again later.',
            details: err.message
        });
    }
};

exports.renderDiscountList = async (req, res) => {
    try {
        const response = await axios.get(`${BACKEND_API}/discounts`);
        const discounts = response.data.discounts;

        res.render('contents/products/discount-list', {discounts});
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};

exports.renderDiscountPost = async (req, res) => {
    try {
        res.render('contents/products/discount-post');
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};

exports.renderDiscountEdit = async (req, res) => {
    try {
        const { id } = req.params; // Extract id from request parameters
       
        // Fetch discount data from the API
       const response = await axios.get(`${BACKEND_API}/discounts/${id}`);
        
       // Extract discount data
       const discount = response.data.discount;

       // Fetch Product Code/identityNumber
       let validProductIds = [];

       if(discount){
        for (let productId of discount.products) {

            const res = await axios.get(`${BACKEND_API}/productsid/${productId}`);
            const product = res.data;
            if (product) {
  
              validProductIds.push(product.identityNumber);  // Add valid product IDs to the array
            } else {
              // Handle invalid product ID (optional)
              console.warn(`Product with ID ${productId} not found.`);
            }
          }
       }

       console.log(validProductIds);

       // Render the view and pass the discount data
       res.render('contents/products/discount-post', { discount, validProductIds });
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};


exports.deleteDiscount = async (req, res) => {
    try {
        const { id } = req.params; // Extract product ID from request parameters

        // Send delete request to the backend
        await axios.delete(`${BACKEND_API}/discounts/${id}`);

        // Redirect to the product list or send a success response
        res.redirect('/products/discount-list');
    } catch (err) {
        console.error(err.message);

        // Handle errors gracefully
        res.status(500).send({
            error: 'Failed to delete the discount. Please try again later.',
            details: err.message
        });
    }
};
