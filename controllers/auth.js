const User = require("../models/user");
const mailgun = require("mailgun-js");
const DOMAIN = "sandbox82671c3da3e34fd287ef99cee93c546d.mailgun.org";
const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN });
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const _ = require("lodash");

const signToken = (userID) => {
  return jwt.sign(
    {
      iss: process.env.LOGIN_TOKEN,
      sub: userID,
    },
    process.env.LOGIN_TOKEN,
    { expiresIn: "1h" }
  );
};

exports.signup = (req, res) => {
  const { name, email, password, role } = req.body;
  const token = jwt.sign(
    { name, email, password, role },
    process.env.JWT_ACC_ACTIVATE,
    { expiresIn: "20m" }
  );
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res
        .status(400)
        .json({ error: "User with this email already exists." });
    } else {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "serus2005@gmail.com",
          pass: "canond550",
        },
      });

      var mailOptions = {
        from: "noreply@ismail.com",
        to: email,
        subject: "Account Activation Link for reset your password",
        html: `
                <h2>Please Click to Given link </h2>

                <a href="${process.env.CLIENT_URL}/authentication/activate/${token}">Tikla</a>
                
                
                `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          res.json('mesaj yollandi')
        }
      });
    }
  });
};

exports.activateAccount = (req, res) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ACC_ACTIVATE,
      function (err, decotedToken) {
        if (err) {
          return res.status(400).json({ error: "Incorrect or Expired Link" });
        } else {
          const { name, email, password, role } = decotedToken;

          let newUser = new User({ name, email, password, role });
          newUser.save((err, success) => {
            if (err) {
              console.log("Activation Error: ", err);
              return res
                .status(400)
                .json({ error: "Error activating Account" });
            }
            res.json({
              message: "signup Success!",
            });
          });
        }
      }
    );
  } else {
    return res.json({ error: "Something went wrong" });
  }
};

exports.forgotPassword = (req, res) => {
  const { email } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "This email is not true." });
    }
    const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_KEY, {
      expiresIn: "20m",
    });

    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "serus2005@gmail.com",
          pass: "canond550",
        },
      });

     

    

    const mailOptions = {
      from: "noreply@ismail.com",
      to: email,
      subject: "Account Activation Link for reset your password",
      html: `
              <h2>Please Click to Given link </h2>
              <p>
              ${process.env.CLIENT_URL}/resetpassword/${token}
              </p>
              `,
    };

    return user.updateOne({ resetLink: token }, (err, success) => {
      if (err) {
        return res.status(400).json({ error: "reset password link error" });
      } else {
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
            res.json('mesaj yollandi')
          }
        });
      }
    });
  });
};

exports.resetPassword = (req, res) => {
  const { resetLink, newPass } = req.body;
  
  if (resetLink) {
    jwt.verify(
      resetLink,
      process.env.RESET_PASSWORD_KEY,
      function (err, encodedData) {
        if (err) {
          return res.status(401).json({
            err: "Incorrect Token or it is expired ",
          });
        }
        User.findOne({ resetLink }, (err, user) => {
          if (err || !user) {
            return res
              .status(400)
              .json({ err: "User with this token is not exist." });
          }
          const obj = {
            password: newPass,
            resetLink: "",
          };

          user = _.extend(user, obj);
          user.save((err, result) => {
            if (err) {
              return res.status(400).json({ err: "Reset Password Error" });
            } else {
              return res
                .status(200)
                .json({ message: "Your Password Has Been Changed" });
            }
          });
        });
      }
    );
  } else {
    return res.status(401).json({ err: "Authentication Error" });
  }
};

exports.signin = (req, res) => {
  if (req.isAuthenticated()) {
    const { _id, name, email, role } = req.user;
    const token = signToken(_id);
    res.cookie("access_token", token, { httpOnly: true, sameSite: true });
    res
      .status(200)
      .json({ isAuthenticated: true, user: { name, email, role } });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("access_token");
  res.json({ user: { name: "", email: "" }, success: true });
};

exports.isAuthenticated = (req, res) => {
  const { name, email, role } = req.user;
 
  res.status(200).json({ isAuthenticated: true, user: { name, email, role } });
 
};
 