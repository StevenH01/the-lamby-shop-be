import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const ses = new SESClient({ region: 'us-west-2' });

export const handler = async (event) => {
  // Check if event.body is a string and parse it only if necessary
  const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

  const { clientEmail, ownerEmail, items, subtotal, tax, shipping, discount, total } = body;

  const receiptContent = `
    <h2>Order Receipt</h2>
    <p>Thank you for your purchase! Here is your order summary:</p>
    <ul>
      ${items.map(item => `<li>${item.itemName} - ${item.quantity} pcs at $${item.itemPrice.toFixed(2)} each</li>`).join('')}
    </ul>
    <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
    <p><strong>Tax:</strong> $${tax.toFixed(2)}</p>
    <p><strong>Shipping:</strong> $${shipping.toFixed(2)}</p>
    <p><strong>Discount:</strong> -$${discount.toFixed(2)}</p>
    <p><strong>Total:</strong> $${total.toFixed(2)}</p>
  `;

  const emailParams = {
    Source: 'thelambyshop@gmail.com',
    Destination: {
      ToAddresses: [clientEmail, ownerEmail],
    },
    Message: {
      Subject: { Data: "Order Receipt - Thank you for your purchase!" },
      Body: {
        Html: { Data: receiptContent },
      },
    },
  };

  try {
    const command = new SendEmailCommand(emailParams);
    await ses.send(command);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
      },
      body: JSON.stringify({ message: "Email sent successfully" }),
    };
  } catch (error) {
    console.error("Error sending email", error);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
      },
      body: JSON.stringify({ error: "Failed to send email" }),
    };
  }
};
