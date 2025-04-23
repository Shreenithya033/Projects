import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, Check, Loader2 } from "lucide-react";
import axios from "../lib/axios";
import { useCartStore } from "../stores/useCartStore";
import toast from "react-hot-toast";

const PaymentGateway = ({ onClose }) => {
  const navigate = useNavigate();
  const { cart, coupon, clearCart } = useCartStore();
  const [formState, setFormState] = useState({
    cardNumber: "4242 4242 4242 4242", // Pre-filled for testing
    cardHolder: "Test User",
    expiryDate: "12/25",
    cvv: "123",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log("Sending request to process-fake-payment with:", {
        products: cart,
        couponCode: coupon ? coupon.code : null,
      });
      
      // Send order to backend
      const response = await axios.post("/payments/process-fake-payment", {
        products: cart,
        couponCode: coupon ? coupon.code : null,
      });
      
      console.log("Payment successful:", response.data);
      
      // Clear cart and redirect to success page
      toast.success("Payment processed successfully!");
      clearCart();
      navigate("/purchase-success");
    } catch (error) {
      console.error("Payment error:", error);
      setError(
        error.response?.data?.message || 
        "Payment processing failed. Please try again or contact support."
      );
      toast.error("Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6">
      <div className="bg-emerald-600 p-4 rounded-t-lg -m-4 mb-4 sm:-m-6 sm:mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center">
            <CreditCard className="mr-2" /> Secure Payment
          </h2>
          <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs font-medium text-white">
            Test Mode
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-300 mb-1">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            placeholder="4242 4242 4242 4242"
            className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white placeholder-gray-400"
            value={formState.cardNumber}
            onChange={handleChange}
            required
          />
          <p className="text-xs text-gray-400 mt-1">
            Use any card number for testing
          </p>
        </div>

        <div>
          <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-300 mb-1">
            Card Holder Name
          </label>
          <input
            type="text"
            id="cardHolder"
            name="cardHolder"
            placeholder="John Doe"
            className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white placeholder-gray-400"
            value={formState.cardHolder}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-300 mb-1">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              placeholder="MM/YY"
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white placeholder-gray-400"
              value={formState.expiryDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-300 mb-1">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              placeholder="123"
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white placeholder-gray-400"
              value={formState.cvv}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-900 bg-opacity-30 border border-red-700 text-red-300 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between mt-6">
          <button 
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isProcessing}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-md text-white font-medium flex items-center transition-colors disabled:opacity-70"
          >
            {isProcessing ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Processing...
              </>
            ) : (
              <>
                <Check className="mr-2" size={18} />
                Pay Now
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentGateway; 