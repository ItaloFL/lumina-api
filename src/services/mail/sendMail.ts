import nodemailer from "nodemailer";
import mjml2html from "mjml";
import { env } from "../../env";

export async function sendMail(
  to: string,
  subject: string,
  mjmlTemplate: string
) {
  const { html } = mjml2html(mjmlTemplate);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.GMAIL_USER,
      pass: env.GMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `${env.GMAIL_USER} <${env.GMAIL_USER}>`,
    to,
    subject,
    html,
  };

  const info = await transporter.sendMail(mailOptions);

  return info;
}
