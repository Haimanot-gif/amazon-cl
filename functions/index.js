const functions = require("firebase-functions")

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51N2hGDAltQUdQBoi6cTAT7oSgDi1YZsfDiCo2LGZxn1g79aLW7rNDx9AgCgqNSePAnRp0pU8BnlGCQTJlMlpQujP00NT44wWcv"
);
// - App config
const app = express();
// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());
app.get("/", (request, response) => response.status(200).send("hi there"));
app.post("/payments/create", async (request, response) =>{
  const total = request.query.total;
  console.log("Payment Request Recieved for this amount >>> ", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });
  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
})



// - Listen command
exports.api = functions.https.onRequest(app);