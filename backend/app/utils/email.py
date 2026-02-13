import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from typing import Optional

def send_reset_password_email(email: str, reset_url: str):
    """
    Sends a password reset email using SMTP configuration from environment variables.
    """
    sender_email = os.getenv("MAIL_SENDER_EMAIL")
    sender_password = os.getenv("MAIL_SENDER_PASSWORD")
    smtp_server = os.getenv("MAIL_SMTP_SERVER", "smtp.gmail.com")
    smtp_port = int(os.getenv("MAIL_SMTP_PORT", "587"))

    if not sender_email or not sender_password:
        print("\n" + "!"*50)
        print("WARNING: Email credentials not configured. Printing link instead.")
        print(f"User: {email}")
        print(f"Link: {reset_url}")
        print("!"*50 + "\n")
        return False

    message = MIMEMultipart("alternative")
    message["Subject"] = "Reset Your Password - Saif Academy"
    message["From"] = f"Saif Academy <{sender_email}>"
    message["To"] = email

    # Create the plain-text and HTML version of your message
    text = f"""
    Hi,
    
    You requested a password reset for your Saif Academy account.
    Please use the link below to reset your password. This link will expire in 15 minutes.
    
    {reset_url}
    
    If you did not request this, please ignore this email.
    """
    
    html = f"""
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #0d1117; color: #fff; padding: 20px; text-align: center;">
                <h2 style="margin: 0;">Saif Academy</h2>
            </div>
            <div style="padding: 20px;">
                <p>Hi,</p>
                <p>You requested a password reset for your Saif Academy account. Please use the button below to reset your password. This link will expire in 15 minutes.</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="{reset_url}" style="background-color: #d4af37; color: #000; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 5px;">Reset Password</a>
                </div>
                <p>Alternatively, you can copy and paste this link into your browser:</p>
                <p style="word-break: break-all;"><a href="{reset_url}">{reset_url}</a></p>
                <p>If you did not request this, please ignore this email.</p>
            </div>
            <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #777;">
                &copy; 2026 Saif Academy. All rights reserved.
            </div>
        </div>
    </body>
    </html>
    """

    # Turn these into plain/html MIMEText objects
    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")

    # Add HTML/plain-text parts to MIMEMultipart message
    # The email client will try to render the last part first
    message.attach(part1)
    message.attach(part2)

    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls() # Secure the connection
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, email, message.as_string())
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False
