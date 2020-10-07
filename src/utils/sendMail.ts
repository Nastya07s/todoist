const nodemailer = require('nodemailer');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default async function sendMail (text: string, titleTask: string) {
  const mentionings = text.match(/\*.*?\s/g);
  const emails = mentionings?.map((mentioning) => mentioning.trim().slice(1));

  const stringOfEmails = emails?.join(', ');

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Todoist" <${process.env.GMAIL}>`,
    to: stringOfEmails,
    subject: 'Mentioned in a comment',
    text: `You were mentioned in the comment in task ${titleTask}`,
  });
};
