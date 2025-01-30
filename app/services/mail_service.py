import os
import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from app.tools.teklogger import log_debug, log_error, log_info, log_success


class MailService:


    @staticmethod
    def _connect_and_authenticate():
        """
        Connect to the SMTP server and authenticate using the provided credentials.
        """
        smtp_host = os.getenv("SMTP_HOST")
        smtp_port = int(os.getenv("SMTP_PORT", 587))
        smtp_user = os.getenv("SMTP_USER")
        smtp_password = os.getenv("SMTP_PASSWORD")
        try:
            server = smtplib.SMTP(smtp_host, smtp_port)
            #server.starttls()
            server.login(smtp_user, smtp_password)
            log_debug(
                f"Connected and authenticated with SMTP server: {smtp_host}")
            return server
        except Exception as e:
            log_error(f"Failed to connect/authenticate to SMTP server: {e}")
            raise

    @staticmethod
    def send_mail(recipient: str, subject: str, body: str):
        """
        Send an email to the specified recipient.
        :param recipient: Email address of the recipient
        :param subject: Subject of the email
        :param body: Body of the email
        """

        log_info(f"Sending mail to {recipient}")

        # Create a multipart message
        message = MIMEMultipart("alternative")
        message["Subject"] = subject
        message["From"] = "Support LOGI-IT <support@logi-it.com>"
        message["To"] = f"{recipient} <{recipient}>"

        # Add HTML content
        part = MIMEText(body, "plain")
        message.attach(part)
        # Convert message to string
        message_str = message.as_string()
        # Send the email
        context = ssl.create_default_context()
        try:
            with smtplib.SMTP_SSL(os.getenv("SMTP_HOST"), int(os.getenv("SMTP_PORT")), context=context) as server:
                server.login(os.getenv("SMTP_USER"), os.getenv("SMTP_PASSWORD"))
                server.sendmail(os.getenv("SMTP_USER"), recipient, message_str)
                log_success(f"Mail successfully sent to {recipient}")
        except Exception as e:
            log_error(f"Failed to send mail to {recipient}: {e}")
