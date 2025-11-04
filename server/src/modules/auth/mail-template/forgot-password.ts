const t = {
  title: 'Reset Your Password',
  heading: 'Reset your password',
  intro:
    'We received a request to reset your password. Tap the button below to create a new one.',
  buttonText: 'Reset Password',
  note: "If you didn't request a password reset, you can safely ignore this email.",
  footer: 'Thanks,<br/>Send with 💚 from IT team.'
};

// Main function with logo URL parameter
export const createResetPasswordEmailContent = (
  logoUrl: string,
  link: string,
): string => {

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>${t.title}</title>
      <!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&family=Noto+Sans+Lao:wght@400;700&display=swap" rel="stylesheet">
      <!--<![endif]-->
      <style>
          body {
              margin: 0;
              padding: 0;
              background-color: #f7f7f7;
              font-family: 'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          }
  
          .email-wrapper {
              width: 100%;
              padding: 40px 0;
              background-color: #f7f7f7;
          }
  
          .email-container {
              max-width: 480px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 12px;
              padding: 40px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
              text-align: center;
          }
  
          .logo-container {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              margin-bottom: 24px;
          }
  
          .logo-svg {
              width: auto;
              height: 32px;
          }
  
          .logo-text {
              display: flex;
              flex-direction: column;
              align-items: flex-end;
              justify-content: flex-end;
              gap: 0;
          }
  
          .logo-text__primary {
              font-size: 30px;
              font-weight: 800;
              color: #334155;
              line-height: 1;
              margin: 0;
          }
  
          .logo-text__secondary {
              font-size: 12px;
              color: #6b7280;
              margin: -4px 0 0 0;
              line-height: 1;
          }
  
          h2 {
              font-size: 24px;
              color: #222;
              margin-bottom: 16px;
          }
  
          .intro {
              font-size: 16px;
              color: #444;
              margin-bottom: 24px;
              line-height: 1.5;
          }
  
          .reset-button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #00AAAC;
              color: #ffffff;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
              font-size: 16px;
          }
  
          .reset-button:hover {
              color: #ffffff;
              background-color: #008C8F;
          }
  
          .note {
              margin-top: 32px;
              font-size: 14px;
              color: #666;
              line-height: 1.4;
          }
  
          .footer {
              margin-top: 16px;
              font-size: 14px;
              color: #888;
              line-height: 1.4;
          }
      </style>
  </head>
  <body lang="en">
  <div class="email-wrapper">
      <div class="email-container">
          <div class="logo-container">
              <img src="${logoUrl}" alt="BKIA HRMS Logo" class="logo-svg" />
              <div class="logo-text">
                  <div class="logo-text__primary">HRMS</div>
                  <div class="logo-text__secondary">BKIA</div>
              </div>
          </div>
          <h2>${t.heading}</h2>
          <p class="intro">${t.intro}</p>
          <a href="${link}" class="reset-button">${t.buttonText}</a>
          <p class="note">${t.note}</p>
          <p class="footer">${t.footer}</p>
      </div>
  </div>
  </body>
  </html>
  `;
};
