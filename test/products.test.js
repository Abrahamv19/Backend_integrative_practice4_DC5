import chai from 'chai';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Products API', () => {
  it('should return a list of products', async () => {
    console.log('Inicio de la prueba');
    const response = await requester.get('/api/products');
    expect(response.status).to.equal(200);
    console.log('Fin de la prueba');
  });

  it('should create a product with a valid authentication token', async () => {
    console.log('Inicio de la prueba');
    const loginResponse = await requester.post('/api/sessions/login', {
      email: 'ha-vasquez@hotmail.com',
      password: '123',
    });
    if (loginResponse.status !== 200) {
      return;
    }
    const token = jwt.sign(
      {
        id: loginResponse.data.user._id,
        email: loginResponse.data.user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    console.log('El token de autenticación es: ', token);
    const response = await requester.post('/api/products').set('Authorization', `Bearer ${token}`).send(productData);
    expect(response.status).to.equal(201);
    console.log('Fin de la solicitud de creación de producto');
    done();
  });
});
