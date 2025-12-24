import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Get recipient email from environment variable
    const recipientEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
    if (!recipientEmail) {
      console.error('NEXT_PUBLIC_CONTACT_EMAIL not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: recipientEmail,
      replyTo: email,
      subject: `New Portfolio Contact from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
                color: white;
                padding: 30px 20px;
                border-radius: 8px 8px 0 0;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
              }
              .content {
                background: #ffffff;
                padding: 30px 20px;
                border: 1px solid #e5e7eb;
                border-top: none;
              }
              .field {
                margin-bottom: 20px;
              }
              .field-label {
                font-weight: 600;
                color: #06b6d4;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 5px;
              }
              .field-value {
                color: #1f2937;
                font-size: 16px;
              }
              .message-box {
                background: #f9fafb;
                border-left: 4px solid #06b6d4;
                padding: 15px;
                margin-top: 10px;
                border-radius: 4px;
                white-space: pre-wrap;
                word-wrap: break-word;
              }
              .footer {
                background: #f9fafb;
                padding: 20px;
                border-radius: 0 0 8px 8px;
                text-align: center;
                font-size: 14px;
                color: #6b7280;
                border: 1px solid #e5e7eb;
                border-top: none;
              }
              .reply-button {
                display: inline-block;
                background: #06b6d4;
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 6px;
                margin-top: 15px;
                font-weight: 500;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>📬 New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="field-label">From</div>
                <div class="field-value">${name}</div>
              </div>
              <div class="field">
                <div class="field-label">Email</div>
                <div class="field-value">
                  <a href="mailto:${email}" style="color: #06b6d4; text-decoration: none;">${email}</a>
                </div>
              </div>
              <div class="field">
                <div class="field-label">Message</div>
                <div class="message-box">${message}</div>
              </div>
              <a href="mailto:${email}" class="reply-button">Reply to ${name}</a>
            </div>
            <div class="footer">
              Sent from your portfolio contact form
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data);

    return NextResponse.json(
      { message: 'Message received successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
