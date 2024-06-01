const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "smtp.ukr.net",
    pool: true,
    port: 2525,
    secure: true,
    auth: {
        user: "roboticontrol@ukr.net",
        pass: "IWxY1O3Ltk4Bia3y",
    },
});

module.exports = transporter;