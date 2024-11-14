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
        fromChainId,
        toChainId,
        nativeValue, // Assuming this represents the amount
        fromAddress, // Buyer address
        fromCurrency,
        fromNetwork,
        toNetwork,
        toCurrency,
        toAddress,
        feeAmount,
        fromAmountFormatted, // Amount in formatted form
        feeAmountFormatted,
        toAmountMinFormatted,
        toAmountFormatted,
        merchantAddress
    } = req.body;

    // Log the received transaction update
    console.log(`Received transaction update:
        Transaction Hash: ${transactionHash},
        Status: ${finalStatus},
        Request ID: ${requestId},
        From Chain ID: ${fromChainId},
        To Chain ID: ${toChainId},
        Native Value: ${nativeValue},
        From Address: ${fromAddress},
        From Currency: ${fromCurrency},
        From Network: ${fromNetwork},
        To Network: ${toNetwork},
        To Currency: ${toCurrency},
        To Address: ${toAddress},
        Fee Amount: ${feeAmount},
        From Amount Formatted: ${fromAmountFormatted},
        Fee Amount Formatted: ${feeAmountFormatted},
        To Amount Min Formatted: ${toAmountMinFormatted},
        To Amount Formatted: ${toAmountFormatted},
        Merchant Address: ${merchantAddress}`);

    // Process the transaction status, update DB, etc.

    res.status(200).json({ message: 'Transaction status received successfully' });
});

module.exports = app;
