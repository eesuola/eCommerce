# eCommerce Application

## Overview
This is a Node.js-based eCommerce application that provides APIs for user authentication, product management, cart operations, order processing, and category management.

## Features
- User authentication (registration, login, token-based authentication)
- Product management (CRUD operations)
- Cart management (add, update, delete, clear all carts)
- Order processing (create, update, delete orders)
- Category management (CRUD operations)
- Admin panel for managing users and products

## Technologies Used
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT) for authentication
- dotenv for environment variable management
- CORS for cross-origin resource sharing

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/ecommerce.git

2. Navigate to the project directory
cd ecommerce

3. Install dependencies
npm install

4. Set up environment variables:
    * Create a .env file in the root directory
    * Add the following variables

    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret

5. Start the server:

npm start


6. The server will run at http://localhost:3000.

**API Endpoints
**
Authentication

POST /auth/register: Register a new user
POST /auth/login: Log in a user and get a token

Products
**GET** /products: Get all products
**POST** /products: Add a new product
**PUT** /products/:id: Update a product
**DELETE** /products/:id: Delete a product

Cart
**POST** /cart: Add an item to the cart
**POST** /updateCart: Update an item in the cart
**DELETE** /deleteCart: Remove an item from the cart
**DELETE** /deleteAllCarts: Clear all carts

Orders
**POST** /order: Create a new order
**GET** /order: Get all orders
**PUT** /order/:id: Update an order
**DELETE** /order/:id: Delete an order

Categories
**GET** /categories: Get all categories
**POST** /categories: Add a new category
**PUT** /categories/:id: Update a category
**DELETE** /categories/:id: Delete a category


```javascript
// Add an item to the cart
routes.post("/cart", addItemToCart);

// Update an item in the cart
routes.post("/updateCart", updateCart);

// Remove an item from the cart
routes.delete("/deleteCart", removeCart);

// Clear all carts
routes.delete("/deleteAllCarts", clearAllCarts);


. Document Your Folder Structure


eCommerce/
├── controller/         # Contains all controller logic
│   ├── cart.js         # Cart-related operations
│   ├── order.js        # Order-related operations
│   ├── product.js      # Product-related operations
│   └── user.js         # User-related operations
├── middleware/         # Middleware for authentication, logging, etc.
│   ├── token.js        # JWT token verification
│   └── terminal.js     # Logs requests to the terminal
├── model/              # Mongoose models for MongoDB
│   ├── cart.js         # Cart schema
│   ├── order.js        # Order schema
│   ├── product.js      # Product schema
│   └── user.js         # User schema
├── routes/             # API route definitions
│   ├── cart.js         # Cart routes
│   ├── order.js        # Order routes
│   ├── product.js      # Product routes
│   └── user.js         # User routes
├── db/                 # Database connection logic
│   └── connect.js      # MongoDB connection setup
├── .env                # Environment variables
├── app.js              # Main application file
├── package.json        # Project metadata and dependencies
└── README.md           # Project documentation