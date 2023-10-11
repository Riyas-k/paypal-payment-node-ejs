const paypal = require("paypal-rest-sdk");
const { MODE, SECRET, CLIENT_ID } = process.env;

paypal.configure({
  mode: MODE,
  client_id: CLIENT_ID,
  client_secret: SECRET,
});

const renderBuyPage = async (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const payProduct = async (req, res) => {
  try {
    // You need to implement the payment logic here using PayPal REST API.
    // Example: Create a payment and execute it.
    const payment = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:3000/success", // Replace with your success URL
        cancel_url: "http://localhost:3000/failure", // Replace with your cancel URL
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: "Sample Item",
                price: "10.00", // Replace with the desired item price
                currency: "USD", // Replace with the desired currency
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "USD", // Replace with the desired currency
            total: "10.00", // Replace with the desired total amount
          },
          description: "Dummy Payment for Testing", // Replace with the desired description
        },
      ],
    };

    paypal.payment.create(payment, (error, payment) => {
      if (error) {
        console.log(error.message);
        res.status(500).send("Payment Error");
      } else {
        // Redirect the user to the PayPal approval URL
        res.redirect(payment.links[1].href);
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const successPage = (req, res) => {
  // Handle successful payment completion here
  res.send("Success");
};

const cancelPage = (req, res) => {
  // Handle payment cancellation here
  res.send("Canceled");
};

module.exports = {
  renderBuyPage,
  payProduct,
  successPage,
  cancelPage,
};
