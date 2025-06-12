// PaymentService.js 
export class PaymentService {
  constructor(backendURL, razorpayKey) {
    this.backendURL = backendURL;
    this.razorpayKey = razorpayKey;
  }

  initializeRazorpay(paymentType, amount, onSuccess, onError, orderData = {}) {
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => this.createRazorpayOrder(amount, paymentType, onSuccess, onError, orderData);
      document.body.appendChild(script);
    } else {
      this.createRazorpayOrder(amount, paymentType, onSuccess, onError, orderData);
    }
  }

  createRazorpayOrder(amount, paymentType, onSuccess, onError, orderData = {}) {
    const requestBody = {
      amount: amount,
      receipt: orderData.receipt || `order_${Date.now()}`,
      notes: orderData.notes || {}
    };

    fetch(`${this.backendURL}/api/v1/payments/create-order`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('authtoken')
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      return response.text(); 
    })
    .then(responseText => {
      if (!responseText) {
        throw new Error('Empty response received from server');
      }
      
      try {
        const data = JSON.parse(responseText);
        if (data.success) {
          this.openRazorpayCheckout(data.order, paymentType, onSuccess, onError, orderData);
        } else {
          onError(data.message || 'Failed to create payment order');
        }
      } catch (jsonError) {
        console.error('Failed to parse JSON:', responseText);
        throw new Error('Invalid JSON response from server');
      }
    })
    .catch(error => {
      console.error('Error creating order:', error);
      onError('Failed to initialize payment. Please try again.');
    });
  }

  openRazorpayCheckout(orderData, paymentType, onSuccess, onError, customData = {}) {
    if (!this.razorpayKey) {
      console.error('Razorpay Key is missing');
      onError('Payment configuration error. Please contact support.');
      return;
    }

    const options = {
      key: this.razorpayKey,
      amount: orderData.amount,
      currency: orderData.currency,
      name: customData.businessName || "Pet DayCare Service",
      description: customData.description || "Payment",
      order_id: orderData.id,
      
      method: {
        netbanking: true,
        card: true,
        wallet: true,
        upi: true,
        paylater: true
      },
      
      config: {
        display: {
          blocks: {
            utib: {
              name: 'Pay using UPI',
              instruments: [
                {
                  method: 'upi'
                }
              ]
            }
          },
          sequence: ['block.utib'],
          preferences: {
            show_default_blocks: true
          }
        }
      },
      handler: function(response) {
        onSuccess(response);
      },
      prefill: customData.prefill || {
        name: "",
        email: "",
        contact: ""
      },
      theme: {
        color: customData.themeColor || "#3399cc"
      }
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  }

  verifyPayment(paymentData, onSuccess, onError) {
    fetch(`${this.backendURL}/api/v1/payments/verify-payment`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('authtoken'),
      },
      body: JSON.stringify(paymentData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      return response.json(); 
    })
    .then(data => {
      if (data.success) {
        onSuccess(data);
      } else {
        onError(data.message || "Payment verification failed");
      }
    })
    .catch(error => {
      console.error("Error verifying payment:", error);
      onError("An error occurred during payment verification");
    });
  }
}
