import { loadStripe } from '@stripe/stripe-js';

// This is your test publishable API key.
const stripePromise = loadStripe('pk_test_51OaBC2DEFghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789');

export default stripePromise;