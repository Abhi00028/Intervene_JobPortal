import nodeMailer from "nodemailer";

export const sendEmailer = async ({ email, subject, message }) => {
  try {
    // Validate inputs
    if (!email || !subject || !message) {
      throw new Error('Missing required email parameters');
    }

    const transporter = nodeMailer.createTransport({
      host: process.env.SMTP_HOST,
      service: process.env.SMTP_SERVICE,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: subject,
      text: message,
      // You can add html: for HTML emails
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error; // Re-throw to handle in the calling function
  }
};