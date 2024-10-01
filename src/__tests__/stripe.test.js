const request = require('supertest');
const app = require('../index');  // Your Express app
const stripeRoutes = require('../routes/stripeRoutes');  // Adjust the path based on the actual location

describe('Stripe Payment Intent API', () => {
  it('should create a payment intent', async () => {
    const res = await request(app)
      .post('/api/stripe/create-payment-intent')
      .send({
        amount: 5000,
        paymentMethodId: 'pm_card_visa',
        email: 'test@example.com'
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
  });

  it('should handle payment failure', async () => {
    const res = await request(app)
      .post('/api/stripe/create-payment-intent')
      .send({
        amount: 5000,
        paymentMethodId: 'pm_card_chargeDeclined',
        email: 'test@example.com'
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });
});
