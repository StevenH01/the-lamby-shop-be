const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.handleStripeWebhook = (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle different event types
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
    // Handle fulfillment
  }

  res.json({ received: true });
};

exports.processPayment = async (req, res) => {
  const { amount, paymentMethodId, email } = req.body;

  try {
    // Step 1: Create a Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method: paymentMethodId,
      receipt_email: email,
      confirmation_method: 'manual',
      confirm: true, // Automatically confirm the payment
    });

    // Respond with Payment Intent details
    res.json({
      success: true,
      paymentIntent,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};