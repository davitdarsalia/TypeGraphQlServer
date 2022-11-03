import nodemailer from "nodemailer";
import { v4 } from "uuid";
import { GlobalRedisClient } from "../../redis";

export const sendEmail = async (email: string, url: string) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<a href="${url}">${url}</a>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

export const generateConfirmationURL = async (userID: number) => {
  const uniqueID = v4();
  await GlobalRedisClient.set(uniqueID, userID, "EX", 60 * 60 * 150);

  return `http://localhost:3000/user/confirm/${uniqueID}`;
};
