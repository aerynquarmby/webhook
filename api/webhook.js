const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

// Use body-parser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// Create the webhook endpoint
app.post('/api/webhook', async (req, res) => {
    // Extract the parameters to match the merchant notification
    const {
        transactionHash,
        finalStatus, // Updated from 'status' to 'finalStatus' to match the notification
        fromAddress,
        fromCurrency,
        fromNetwork,
        toNetwork,
        toCurrency,
        toAddress,
        requestId,
        fromAmountFormatted,
        feeAmountFormatted,
        toAmountMinFormatted,
        toAmountFormatted,
        merchantAddress,
        merchantWebhook // URL for notifying the merchant
    } = req.body;

    // Log received data for debugging
    console.log(`Received transaction update:
        Transaction Hash: ${transactionHash},
        Status: ${finalStatus},
        From Address: ${fromAddress},
        From Currency: ${fromCurrency},
        From Network: ${fromNetwork},
        To Network: ${toNetwork},
        To Currency: ${toCurrency},
        To Address: ${toAddress},
        Request ID: ${requestId},
        From Amount: ${fromAmountFormatted},
        Fee Amount: ${feeAmountFormatted},
        To Amount Min: ${toAmountMinFormatted},
        To Amount: ${toAmountFormatted},
        Merchant Address: ${merchantAddress}`);

    // Notify merchant if webhook URL is provided
    if (merchantWebhook) {
        const payload = {
            transactionHash,
            finalStatus,
            fromAddress,
            fromCurrency,
            fromNetwork,
            toNetwork,
            toCurrency,
            toAddress,
            requestId,
            fromAmountFormatted,
            feeAmountFormatted,
            toAmountMinFormatted,
            toAmountFormatted,
            merchantAddress,
        };

        try {
            const response = await axios.post(merchantWebhook, payload);
            console.log(`Merchant notified: ${response.statusText}`);
            res.status(200).json({ message: 'Merchant notified successfully' });
        } catch (error) {
            console.error(`Failed to notify merchant: ${error.message}`);
            res.status(500).json({ error: 'Failed to notify merchant' });
        }
    } else {
        res.status(400).json({ error: 'Merchant webhook URL missing' });
    }
});

module.exports = app;
