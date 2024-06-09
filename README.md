# Simple Product Management REST API

This repository contains a simple REST API for managing product data. It provides endpoints to perform CRUD operations on product data and integrates with a database for data storage.

## Technologies Used

- **Node.js**: A JavaScript runtime environment.
- **Express.js**: A minimalist web framework for Node.js.
- **MongoDB**: A NoSQL database for storing product information.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.

## Installation

1. Clone this repository:
   
   ```bash
   git clone https://github.com/esinniobiwaquareeb/nodejs-product-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd product-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:
   
   Create a `.env` file in the root directory and add the following variables:

   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/products
   ```

## Usage

1. Start the server:

   ```bash
   npm start
   ```

2. The server will start running on `http://localhost:3000`.

3. You can now use the following endpoints:

   - **Retrieve all products**: `GET /products`
   - **Retrieve a single product by ID**: `GET /products/:id`
   - **Create a new product**: `POST /products`
   - **Update an existing product**: `PUT /products/:id`
   - **Delete a product**: `DELETE /products/:id`

## Authentication

This API uses JWT for authentication. To access protected endpoints, you need to include a valid JWT token in the request headers.

## Sample Requests

### Create a new product

```bash
curl -X POST http://localhost:3000/products -H "Content-Type: application/json" -d '{
  "name": "Sample Product",
  "description": "This is a sample product",
  "price": 19.99,
  "imageUrl": "https://example.com/sample-product.jpg"
}'
```

### Retrieve all products

```bash
curl http://localhost:3000/products
```

### Retrieve a single product by ID

```bash
curl http://localhost:3000/products/1234
```

### Update an existing product

```bash
curl -X PUT http://localhost:3000/products/1234 -H "Content-Type: application/json" -d '{
  "name": "Updated Product",
  "description": "This is an updated product description",
  "price": 29.99,
  "imageUrl": "https://example.com/updated-product.jpg"
}'
```

### Delete a product

```bash
curl -X DELETE http://localhost:3000/products/1234
```

## Test Result

![Product API Test Result](https://i.imgur.com/EbMxUg7.png)


## Contributors

- Esinniobiwa Quareeb <equareeb@gmail.com>

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.