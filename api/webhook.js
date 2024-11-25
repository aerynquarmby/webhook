const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Use body-parser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// Create the webhook endpoint
app.post('/api/webhook', (req, res) => {
    // Extract parameters based on transaction confirmation code
    const {
        transactionHash,
        finalStatus,
        requestId,
        fromAddress, // Buyer address
        fromCurrency,
        fromNetwork,
        toNetwork,
        toCurrency,
        toAddress,
        fromAmountFormatted, // Amount in formatted form
        feeAmountFormatted,
        toAmountMinFormatted,
        toAmountFormatted,
        merchantAddress,
        statusType
    } = req.body;

    // Log the received transaction update
    console.log(`Received transaction update:
        Transaction Hash: ${transactionHash},
        Status: ${finalStatus},
        Request ID: ${requestId},
        From Address: ${fromAddress},
        From Currency: ${fromCurrency},
        From Network: ${fromNetwork},
        To Network: ${toNetwork},
        To Currency: ${toCurrency},
        To Address: ${toAddress},
        From Amount: ${fromAmountFormatted},
        Fee Amount: ${feeAmountFormatted},
        To Amount Min: ${toAmountMinFormatted},
        To Amount: ${toAmountFormatted},
        Merchant Address: ${merchantAddress},
        Status Type: ${statusType}`);

    // Process the transaction status, update DB, etc.

    res.status(200).json({ message: 'Transaction status received successfully' });
});

module.exports = app;
