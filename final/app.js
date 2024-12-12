// Initialize Express
const express = require('express')

// Add the handlebars view engine 
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express()

// Configure Express to use Handlebars
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')

// Serve static files
app.use(express.static('public'))

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000

// Data
const gallery = require('./data/gallery.json')

// Home route
app.get("/", (req, res) => {
    const data = require('./data/homepage.json') 
    res.render('homepage', { gallery, data })
})

// About page
app.get("/about", (req, res) => {
    const data = require('./data/about.json')
    res.render('page', { data })
})

// Dynamic category route
app.get("/category/:category", (req, res) => {
    const category = req.params.category
    const data = require(`./data/${category}.json`)  // Dynamically load category data
    res.render('category', { data })
})

// Dynamic product details route
app.get("/category/:categoryName/details/:id", (req, res) => {
    const categoryName = req.params.categoryName;
    const productId = req.params.id;
    const data = require(`./data/${categoryName}.json`);

    // Find the current product by ID
    const currentProduct = data.products.find(product => product.id == productId);

    // Find related products from the same category, excluding the current product
    const relatedItems = data.products
      .filter(product => product.category === currentProduct.category && product.id != productId)
      .slice(0, 4);  // Limit to the first 4 related items

    // Render the details page with current product, related items, and categoryName
    res.render('details', { 
      product: currentProduct, 
      relatedItems: relatedItems,
      categoryName: categoryName  // Make sure categoryName is available in the template
    });
});

// Cart in-memory storage
let cart = { "products": [] }

// Cart route
app.get("/cart", (req, res) => {              
    if (req.query.id) {
        // Add the product to the cart
        const product = {
            id: req.query.id,
            name: req.query.name,
            description: req.query.description,
            price: req.query.price,
            image: req.query.image
        };
        cart.products.push(product);
    }
    res.render("cart", { "products": cart.products });
});

// Checkout route
app.post("/checkout", (req, res) => {
    if (cart.products.length === 0) {
        // If no products are in the cart, redirect to the cart page
        return res.redirect("/cart");
    }

    const order = {
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        products: cart.products,  // Ensure products are included
        orderDate: new Date().toISOString()
    };

    // Read the existing orders from orders.json
    const ordersFilePath = './data/orders.json';
    fs.readFile(ordersFilePath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error("Error reading orders file:", err);
            return res.status(500).render('500');
        }

        // Parse the orders if the file exists, or create an empty array if it doesn't
        const orders = data ? JSON.parse(data) : [];

        // Add the new order to the list
        orders.push(order);

        // Write the updated orders back to orders.json
        fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), 'utf8', (err) => {
            if (err) {
                console.error("Error saving orders:", err);
                return res.status(500).render('500');
            }

            // Clear the cart after the order is saved
            cart.products = [];
            // Redirect to the thank-you page
            res.redirect('/thank-you');
        });
    });
});

// Thank-you page
app.get("/thank-you", (req, res) => {
    res.render('checkout');
});

// Error handling for 404
app.use((req, res) => {
    res.status(404)
    res.render('404')
})

// Server error handling for 500
app.use((error, req, res, next) => {
    console.log(error.message)
    res.status(500)
    res.render('500')
})

// Start the server
app.listen(port, () => {
    console.log(`Server started http://localhost:${port}`)
    console.log('To close press Ctrl-C')
})
