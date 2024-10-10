import stripePackage from 'stripe';
// const stripe = stripePackage('your-secret-key');
const stripe = stripePackage('sk_test_51PzkHeRqczblMRgOcV4xT8vFiPo6XlsJkg4XCZL6U2Zl6mc6CRbZInDrJQbpyi1250pagJQnyxM9seanBaO8XJcM00onPL3z9V');

export const paymentHandler = async (event) => {
    
    if (event.httpMethod !== 'POST') {
     throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    
    console.log("Hello world");
    // All log statements are written to CloudWatch
    console.info('received:', event);
    // Determine how to parse
    const isRunningLocally = process.env.AWS_SAM_LOCAL;
    // var email;
    var paymentMethodId;
    var amount;
    
    if (isRunningLocally) {
        console.log("isRunningLocally =", isRunningLocally);
        // email = event.body.email;
        paymentMethodId = event.body.paymentMethodId;
        amount = event.body.amount;
        console.log(amount);
    }
    else {
      console.log("isRunningLocally =", isRunningLocally);
      // paymentMethodId = JSON.parse(event.body.paymentMethodId);
      // amount = JSON.parse(event.body.amount);
        let body = JSON.parse(event.body);
        paymentMethodId = body.paymentMethodId;
        amount = body.amount;
        console.log(amount);
    }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
      return_url: 'https://www.google.com/'
    });

    return {
      statusCode: 200,
      body: JSON.stringify(paymentIntent),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }

//     const response = {
//         statusCode: 200,
//         body: JSON.stringify(paymentIntent)
//     };

    // All log statements are written to CloudWatch
    // console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
//     return response;
};
