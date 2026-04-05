const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');  // Import cors

const app = express();
const port = 3000;

// Enable CORS for requests from localhost:8080
app.use(cors({ origin: 'http://localhost:8080' }));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (your HTML files)
app.use(express.static(__dirname, '/'));

// POST route to handle payment form submission
app.post('/pay', (req, res) => {
    const { email } = req.body;

    // Create a transporter to send emails using a service like Gmail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shwetakare29@gmail.com',  // Your email address
            pass: 'hubr srwe bogc crrp'    // Your email password (use environment variables for security)
        }
    });

    // Email options
    const mailOptions = {
        from: 'shwetakare29@gmail.com',
        to: email,
        subject: 'Payment Success',
        text: 'Your payment was successful! Thank you for your purchase.'
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email.');
        } else {
            console.log('Email sent: ' + info.response);
            // Redirect back to the payment page after email is sent
            res.redirect('http://localhost:8080/wim%20lab/payment-success.html');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
