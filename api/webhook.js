const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Use body-parser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// Create the webhook endpoint
app.post('/api/webhook', (req, res) => {
    // Extract both sets of potential parameters
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

    const {
        transactionHash: solanaTransactionHash,
        status: solanaStatus,
        amount: solanaAmount,
        buyerAddress: solanaBuyerAddress
    } = req.body;

    // Check which type of notification we're dealing with
    if (transactionHash && finalStatus) {
        // Handle the current notification format
        console.log(`Received standard transaction update:
            Hash: ${transactionHash},
            Status: ${finalStatus},
            Amount: ${amount},
            Buyer Address: ${buyerAddress},
            Currency: ${currency},
            Nonce: ${nonce},
            Order Code: ${orderCode},
            Product Name: ${productName},
            Reference ID: ${referenceId}`);

        // Process the transaction status, update DB, etc.

        res.status(200).json({ message: 'Standard transaction status received successfully' });
    } else if (solanaTransactionHash && solanaStatus) {
        // Handle the Solana-specific notification format
        console.log(`Received Solana transaction update:
            Hash: ${solanaTransactionHash},
            Status: ${solanaStatus},
            Amount: ${solanaAmount},
            Buyer Address: ${solanaBuyerAddress}`);

        // Process the Solana transaction status, update DB, etc.

        res.status(200).json({ message: 'Solana transaction status received successfully' });
    } else {
        // Neither format was recognized, respond with an error
        res.status(400).json({ error: 'Invalid request. Required fields are missing.' });
    }
});

module.exports = app;
