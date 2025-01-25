exports.orderConfirmationEmail = (firstName, foodItemName) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Order Confirmation</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .cta {
                display: inline-block;
                padding: 10px 20px;
                background-color: #4FAF5A;
                color: #000000;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                margin-top: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <!-- <a href="https://studynotion-edtech-project.vercel.app"><img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png"
            alt="StudyNotion Logo"></a> -->
            <div class="message">Order Confirmation</div>
            <div class="body">
                <p>Dear ${firstName},</p>
                <p>You have successfully placed an order for <span class="highlight">"${foodItemName}"</span>. We
                    are excited to prepare your meal!</p>
                <p>Your order will be processed and delivered shortly. We hope you enjoy your meal!</p>
                <a class="cta" href="https://yourrestaurant.com/order-status">Track your Order</a>
            </div>
            <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
                    href="mailto:support@yourrestaurant.com">support@yourrestaurant.com</a>. We're happy to help!</div>
        </div>
    </body>
    
    </html>`;
};