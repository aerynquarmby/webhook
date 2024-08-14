const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Use body-parser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// Create the webhook endpoint
app.post('/api/webhook', (req, res) => {
    const {
        transactionHash,
        finalStatus, // Updated from 'status' to 'finalStatus' to match the notification
        amount,
        buyerAddress,
        currency,
        nonce,
        orderCode,
        productName,
        referenceId
    } = req.body;

    // Validate required fields
    if (!transactionHash || !finalStatus) {
        return res.status(400).json({ error: 'transactionHash and finalStatus are required' });
    }

    // Optionally validate other fields if needed
    if (!amount || !buyerAddress || !currency || !nonce || !orderCode || !productName || !referenceId) {
        console.warn('Some optional fields are missing.');
    }

    console.log(`Received transaction update:
        Hash: ${transactionHash},
        Status: ${finalStatus},
        Amount: ${amount},
        Buyer Address: ${buyerAddress},
        Currency: ${currency},
        Nonce: ${nonce},
        Order Code: ${orderCode},
        Product Name: ${productName},
        Reference ID: ${referenceId}`);

    // Here you can add any logic to process the transaction status,
    // such as updating a database, triggering other actions, etc.

    // Send a success response back to the sender
    res.status(200).json({ message: 'Transaction status received successfully' });
});

module.exports = app;
