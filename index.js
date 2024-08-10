const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Use body-parser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// Create the webhook endpoint
app.post('/webhook', (req, res) => {
    const { transactionHash, status } = req.body;

    if (!transactionHash || !status) {
        return res.status(400).json({ error: 'transactionHash and status are required' });
    }

    console.log(`Received transaction update: Hash: ${transactionHash}, Status: ${status}`);

    // Here you can add any logic to process the transaction status, 
    // such as updating a database, triggering other actions, etc.

    // Send a success response back to the sender
    res.status(200).json({ message: 'Transaction status received successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Webhook server is listening on port ${PORT}`);
});
