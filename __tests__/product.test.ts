import request from 'supertest';
import app from '../src/server';
import mongoose, { ConnectOptions } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('Product API', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    const mongoUri = 'mongodb://localhost:27017/products';
    mongoose.connect(mongoUri, {
    useUnifiedTopology: true
  } as ConnectOptions)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
  });

  afterAll(async () => {
    if (mongoServer) {
      try {
        await mongoose.disconnect();
        await mongoServer.stop();
      } catch (err) {
        console.error('Error stopping MongoMemoryServer:', err);
      }
    }
  });

  beforeEach(async () => {
    await mongoose.connection.dropDatabase();
  });

  it('should get all products', async () => {
    await request(app).post('/products').send({
      name: 'Product 1',
      description: 'Description 1',
      price: 10.99,
      imageUrl: 'https://cdn.britannica.com/94/151894-050-F72A5317/Brown-eggs.jpg'
    });
    await request(app).post('/products').send({
      name: 'Product 2',
      description: 'Description 2',
      price: 20.99,
      imageUrl: 'https://cdn.britannica.com/94/151894-050-F72A5317/Brown-eggs.jpg'
    });

    const response = await request(app).get('/products');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
  });

  it('should get a single product by ID', async () => {
    const createdProduct = await request(app)
      .post('/products')
      .send({
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        imageUrl: 'https://cdn.britannica.com/94/151894-050-F72A5317/Brown-eggs.jpg'
      });

    const response = await request(app).get(`/products/${createdProduct.body._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(createdProduct.body);
  });

  it('should create a new product', async () => {
    const newProduct = {
      name: 'Test Product',
      description: 'Test Description',
      price: 99.99,
      imageUrl: 'https://cdn.britannica.com/94/151894-050-F72A5317/Brown-eggs.jpg'
    };

    const response = await request(app)
      .post('/products')
      .send(newProduct);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newProduct);
  });

  it('should update an existing product', async () => {
    const createdProduct = await request(app)
      .post('/products')
      .send({
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        imageUrl: 'https://cdn.britannica.com/94/151894-050-F72A5317/Brown-eggs.jpg'
      });

    const updatedProduct = {
      name: 'Updated Product',
      description: 'Updated Description',
      price: 49.99,
      imageUrl: 'https://cdn.britannica.com/94/151894-050-F72A5317/Brown-eggs.jpg'
    };

    const response = await request(app)
      .put(`/products/${createdProduct.body._id}`)
      .send(updatedProduct);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedProduct);
  });

  it('should delete a product', async () => {
    const createdProduct = await request(app)
      .post('/products')
      .send({
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        imageUrl: 'https://cdn.britannica.com/94/151894-050-F72A5317/Brown-eggs.jpg'
      });

    const response = await request(app).delete(`/products/${createdProduct.body._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Product deleted');
  });

  it('should return 404 for getting a non-existent product', async () => {
    const response = await request(app).get('/products/6661b30c6e2e8d6833f94851'); // Provide a valid endpoint
  
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Product not found');
  });
  
  it('should return 404 for updating a non-existent product', async () => {
    const updatedProduct = {
      name: 'Updated Product',
      description: 'Updated Description',
      price: 49.99,
      imageUrl: 'https://cdn.britannica.com/94/151894-050-F72A5317/Brown-eggs.jpg'
    };
  
    const response = await request(app)
      .put('/products/6661b30c6e2e8d6833f94851')
      .send(updatedProduct);
  
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Product not found');
  });
  
  it('should return 404 for deleting a non-existent product', async () => {
    const response = await request(app).delete('/products/6661b30c6e2e8d6833f94851');
  
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Product not found');
  });
});
