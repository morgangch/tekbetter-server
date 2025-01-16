import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from app.tools.teklogger import log_debug, log_error


class MailService:
    smtp_host = os.getenv("SMTP_HOST")
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    smtp_user = os.getenv("SMTP_USER")
    smtp_password = os.getenv("SMTP_PASSWORD")

    @staticmethod
    def _connect_and_authenticate():
        """
        Connect to the SMTP server and authenticate using the provided credentials.
        """
        try:
            server = smtplib.SMTP(MailService.smtp_host, MailService.smtp_port)
            server.starttls()
            server.login(MailService.smtp_user, MailService.smtp_password)
            log_debug(
                f"Connected and authenticated with SMTP server: {MailService.smtp_host}")
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
        msg = MIMEMultipart()
        msg["From"] = MailService.smtp_user
        msg["To"] = recipient
        msg["Subject"] = subject
        msg.attach(MIMEText(body, "plain"))

        try:
            server = MailService._connect_and_authenticate()
            server.sendmail(msg["From"], msg["To"], msg.as_string())
            log_debug(f"Mail successfully sent to {recipient}")
        except Exception as e:
            log_error(f"Error while sending mail to {recipient}: {e}")
        finally:
            if 'server' in locals() and server:
                server.quit()
                log_debug("SMTP connection closed")
