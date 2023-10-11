require("dotenv").config();

const app = require("express")();
const http = require("http").Server(app);

const payment_route = require("./routes/payment-routes");

app.use("/", payment_route);

http.listen(3000, () => {
  console.log("Running");
});
