import dotenv from "dotenv";

dotenv.config();

// Mock Stripe implementation for fake payment gateway
export const stripe = {
  // Mock function for payment intents
  paymentIntents: {
    create: async () => ({
      id: 'pi_' + Math.random().toString(36).substring(2, 15),
      client_secret: 'secret_' + Math.random().toString(36).substring(2, 15),
      amount: 0,
      currency: 'inr',
      status: 'succeeded'
    }),
    confirm: async () => ({
      id: 'pi_' + Math.random().toString(36).substring(2, 15),
      status: 'succeeded'
    }),
    retrieve: async () => ({
      id: 'pi_' + Math.random().toString(36).substring(2, 15),
      status: 'succeeded'
    })
  },
  // Add other Stripe API methods as needed
  customers: {
    create: async () => ({
      id: 'cus_' + Math.random().toString(36).substring(2, 15)
    })
  }
};
