const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51LO0NpGWffcGuxyvwUwT18biou7XpjrE3yCFpc9RNx40hGLMgbbp3upqUbsTCRrrtMBYyAJuQN3ox4hIr1Hsd1XH00jUy5d8Of");

// API stup

// App config
const app = express();

// Middlewares
app.use(cors({ origin: true}));
app.use(express.json());

// API routes
app.get("/", (request, response) => response.status(200).send("hello Amazon"));

app.post("/payments/create", async (request, response) => {
    const total = request.query.total;

    console.log("Payment Req recieved >>", total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount:total,
        currency: "usd",

    });

    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});

// Listen command
exports.api = functions.https.onRequest(app)


// http://localhost:5001/clone-b72c0/us-central1/api

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
