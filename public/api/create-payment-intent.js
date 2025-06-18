// This is a mock API endpoint for demonstration purposes
// In a real application, this would be implemented on your backend server

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { amount, currency, items } = req.body;

    // Mock PaymentIntent response
    const paymentIntent = {
      id: `pi_demo_${Date.now()}`,
      client_secret: `pi_demo_${Date.now()}_secret_demo`,
      amount: amount,
      currency: currency,
      status: 'requires_payment_method',
      created: Math.floor(Date.now() / 1000),
    };

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}