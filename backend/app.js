
// import express from "express";
// import { config } from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import { connection } from "./database/connection.js";
// import { errorMiddleware } from "./middlewares/error.js";
// import fileUpload from "express-fileupload";
// import userRouter from "./routes/userRouter.js";
// import jobRouter from "./routes/jobRouter.js";
// import applicationRouter from "./routes/applicationRouter.js";
// import { newsLetterCron } from "./automation/newsLetterCron.js";
// import interviewRoutes from "./routes/interviewRoutes.js";
// import bodyParser from "body-parser";
// import paypal from "@paypal/payouts-sdk";
// import paypalCheckout from "@paypal/checkout-server-sdk";
// import earningsRouter from "./routes/earningRouter.js";

// // Load environment variables
// config({ path: "./config/config.env" });

// const app = express();

// // Middleware
// app.use(cors({
//   origin: [process.env.FRONTEND_URL],
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//   credentials: true,
// }));

// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(fileUpload({
//   useTempFiles: true,
//   tempFileDir: "/tmp/",
// }));

// // PayPal Configuration
// const clientId = process.env.PAYPAL_CLIENT_ID;
// const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

// if (!clientId || !clientSecret) {
//   console.error("PayPal credentials missing!");
//   process.exit(1);
// }

// // PayPal Environment Setup
// const environment = new paypalCheckout.core.SandboxEnvironment(clientId, clientSecret);
// const paypalClient = new paypalCheckout.core.PayPalHttpClient(environment);

// // Payout Endpoint
// app.post("/api/v1/withdraw", async (req, res) => {
//   try {
//     const { amount, email } = req.body;

//     // Validate input
//     if (!amount || !email) {
//       return res.status(400).json({ 
//         error: "Missing required fields",
//         details: "Both amount and email are required"
//       });
//     }

//     // Create payout request
//     const request = new paypal.payouts.PayoutsPostRequest();
//     request.requestBody({
//       sender_batch_header: {
//         sender_batch_id: `BATCH-${Date.now()}`,
//         email_subject: "Your payment has arrived!"
//       },
//       items: [{
//         recipient_type: "EMAIL",
//         amount: {
//           value: parseFloat(amount).toFixed(2),
//           currency: "USD"
//         },
//         receiver: email,
//         note: "Thank you for your service!",
//         sender_item_id: `ITEM-${Date.now()}`
//       }]
//     });

//     // Execute payout
//     const response = await paypalClient.execute(request);
    
//     res.status(200).json({
//       success: true,
//       payout: {
//         batch_id: response.result.batch_header.payout_batch_id,
//         status: response.result.batch_header.batch_status,
//         amount: amount,
//         receiver: email
//       }
//     });

//   } catch (error) {
//     console.error("PAYOUT ERROR:", error);
    
//     // PayPal-specific error details
//     const paypalError = error?.details?.[0] || {
//       issue: "Unknown issue",
//       description: error.message
//     };
    
//     res.status(500).json({
//       error: "Payout failed",
//       details: paypalError
//     });
//   }
// });


// // New route to check payout status
// app.get("/api/v1/withdraw/status/:batchId", async (req, res) => {
//   try {
//     const { batchId } = req.params;
    
//     // Validate the batchId
//     if (!batchId) {
//       return res.status(400).json({ error: "Missing batchId" });
//     }

//     // Create a request to get the payout status
//     const request = new paypal.payouts.PayoutsGetRequest(batchId);
    
//     // Execute PayPal API request
//     const response = await paypalClient.execute(request);

//     // Send the status back to the client
//     res.status(200).json({
//       message: "Payout status retrieved successfully",
//       status: response.result.batch_header.batch_status,
//       details: response.result.items,
//     });
//   } catch (error) {
//     console.error("❌ Error fetching payout status:", error);
//     res.status(500).json({ error: "Error fetching payout status", details: error.message });
//   }
// });


// // Routes
// app.use("/api/v1", earningsRouter);
// app.use("/api/v1/user", userRouter);
// app.use("/api/v1/job", jobRouter);
// app.use("/api/v1/application", applicationRouter);
// app.use("/api/v1/interview", interviewRoutes);

// // Initialize
// newsLetterCron();
// connection();

// // Error handling
// app.use(errorMiddleware);

// export default app;

import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";
import jobRouter from "./routes/jobRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import { newsLetterCron } from "./automation/newsLetterCron.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import bodyParser from "body-parser";
import paypal from "@paypal/payouts-sdk";
import paypalCheckout from "@paypal/checkout-server-sdk";
import earningsRouter from "./routes/earningRouter.js";
import mongoose from "mongoose";
import Earnings from "./models/earningsSchema.js";
import Payment from "./models/paymentSchema.js";
import { sendEmailer } from './utils/sendEmailer.js'

// Load environment variables
config({ path: "./config/config.env" });

const app = express();
const router = express.Router();

// Middleware
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
}));

// PayPal Configuration
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error("PayPal credentials missing!");
  process.exit(1);
}

// PayPal Environment Setup
const environment = new paypalCheckout.core.SandboxEnvironment(clientId, clientSecret);
const paypalClient = new paypalCheckout.core.PayPalHttpClient(environment);

// Payout Endpoint with Earnings Deduction
// ... (previous imports remain the same)

// Payout Endpoint with Earnings Deduction
app.post("/api/v1/withdraw", async (req, res) => {
  try {
    const { amount, email, interviewerId } = req.body;

    // Validate input
    if (!amount || !email || !interviewerId) {
      return res.status(400).json({ 
        error: "Missing required fields",
        details: "Amount, email, and interviewerId are required"
      });
    }

    // Validate amount is a positive number
    const payoutAmount = parseFloat(amount);
    if (isNaN(payoutAmount)) {  // Fixed syntax error here - added missing parenthesis
      return res.status(400).json({
        error: "Invalid amount",
        details: "Amount must be a valid number"
      });
    }

    if (payoutAmount <= 0) {
      return res.status(400).json({
        error: "Invalid amount",
        details: "Amount must be greater than zero"
      });
    }

    // Check available earnings
    const earnings = await Earnings.findOne({ interviewerId: new mongoose.Types.ObjectId(interviewerId) });
    if (!earnings) {
      return res.status(404).json({ 
        error: "Earnings not found",
        details: "No earnings record found for this interviewer"
      });
    }

    if (earnings.amount < payoutAmount) {
      return res.status(400).json({
        error: "Insufficient funds",
        details: `Available balance: $${earnings.amount.toFixed(2)}`
      });
    }

    // Create payout request
    const request = new paypal.payouts.PayoutsPostRequest();
    request.requestBody({
      sender_batch_header: {
        sender_batch_id: `BATCH-${Date.now()}`,
        email_subject: "Your payment has arrived!",
        email_message: "Thank you for your service as an interviewer."
      },
      items: [{
        recipient_type: "EMAIL",
        amount: {
          value: payoutAmount.toFixed(2),
          currency: "USD"
        },
        receiver: email,
        note: "Interview service payment",
        sender_item_id: `ITEM-${Date.now()}`
      }]
    });

    // Execute payout
    const response = await paypalClient.execute(request);

    // Update earnings only after successful payout
    earnings.amount -= payoutAmount;
    await earnings.save();


// Create payment record - ADD THIS SECTION
const paymentRecord = new Payment({
  interviewerId: new mongoose.Types.ObjectId(interviewerId),
  batchId: response.result.batch_header.payout_batch_id,
  amount: payoutAmount,
  status: response.result.batch_header.batch_status,
  receiver: email,
  payoutResponse: response.result
});
await paymentRecord.save();



    // Respond with success
    res.status(200).json({
      success: true,
      payout: {
        batch_id: response.result.batch_header.payout_batch_id,
        status: response.result.batch_header.batch_status,
        amount: payoutAmount.toFixed(2),
        receiver: email
      },
      remaining_balance: earnings.amount
    });

  } catch (error) {
    console.error("PAYOUT ERROR:", error);
    
    const paypalError = error?.details?.[0] || {
      issue: "Unknown issue",
      description: error.message
    };
    
    res.status(500).json({
      error: "Payout failed",
      details: paypalError
    });
  }
});



// Get payment history for interviewer
app.get("/api/v1/payments/:interviewerId", async (req, res) => {
  try {
    const { interviewerId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(interviewerId)) {
      return res.status(400).json({ error: "Invalid interviewer ID" });
    }

    const payments = await Payment.find({ interviewerId })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({ payments });
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ error: "Failed to fetch payment history" });
  }
});
// ... (rest of the code remains the same)



// Status check endpoint
app.get("/api/v1/withdraw/status/:batchId", async (req, res) => {
  try {
    const { batchId } = req.params;
    
    if (!batchId) {
      return res.status(400).json({ error: "Batch ID is required" });
    }

    // Create PayPal API request
    const request = new paypal.payouts.PayoutsGetRequest(batchId);
    
    // Execute the request
    const response = await paypalClient.execute(request);

    res.status(200).json({
      status: response.result.batch_header.batch_status,
      details: response.result.items
    });
  } catch (error) {
    console.error("Error checking payout status:", error);
    res.status(500).json({ 
      error: "Failed to check status",
      details: error.message 
    });
  }
});

router.post('/send-interview-email', async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Email, subject, and message are required'
      });
    }

    await sendEmailer({ email, subject, message });

    res.status(200).json({
      success: true,
      message: 'Email sent successfully'
    });
  } catch (error) {
    console.error('Error sending interview email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message
    });
  }
});





// Routes
app.use("/api/v1", earningsRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);
app.use("/api/v1/interview", interviewRoutes);

// Initialize
newsLetterCron();
connection();

// Error handling
app.use(errorMiddleware);

export default app;