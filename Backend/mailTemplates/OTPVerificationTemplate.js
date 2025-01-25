exports.OTPVerificationEmail = (email, otp) => {
  return `<!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="UTF-8">
      <title>Order Confirmation</title>
  </head>
  
  <body>
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; padding: 20px; line-height: 1.5;">
          <h2 style="text-align: center; color: #FF6B6B;">BiteTasty OTP Verification</h2>
          <p>Hi ${email},</p>
          <p>
              Thank you for signing up with BiteTasty! Use the one-time password (OTP) below to verify your account:
          </p>
          <div
              style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; color: #FF6B6B; border-radius: 4px; margin: 20px 0;"
          >
              ${otp}
          </div>
          <p>This OTP is valid for the next <strong>10 minutes</strong>. Please use it promptly.</p>
          <p style="margin-top: 20px;">
              If you didn’t request this, you can safely ignore this email.
          </p>
          <p style="font-size: 14px; color: #777; text-align: center; margin-top: 20px;">
              © ${new Date().getFullYear()} BiteTasty. All rights reserved.
          </p>
      </div>
  </body>
  
  </html>`;
};
