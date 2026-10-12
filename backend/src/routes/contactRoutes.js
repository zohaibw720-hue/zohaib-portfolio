
const express = require("express");
const Contact = require("../models/Contact");
const sendContactNotification = require("../config/mailer");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required.",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanMessage = message.trim();

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields.",
      });
    }

    if (
      cleanName.length > 100 ||
      cleanEmail.length > 254 ||
      cleanMessage.length > 3000
    ) {
      return res.status(400).json({
        success: false,
        message: "One or more fields exceed the allowed length.",
      });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    // Pehle message MongoDB mein save hoga.
    const contact = await Contact.create({
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage,
    });

    // Email fail ho tab bhi saved message database mein rahega.
    let emailSent = false;

    try {
      await sendContactNotification({
        name: cleanName,
        email: cleanEmail,
        message: cleanMessage,
      });

      emailSent = true;
      console.log("Contact notification email sent successfully.");
    } catch (emailError) {
      console.error("Contact notification email failed:", emailError.message);
    }

    return res.status(201).json({
      success: true,
      message: "Your message has been received successfully.",
      emailSent,
      data: {
        id: contact._id,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    console.error("Contact form error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to send your message right now. Please try again later.",
    });
  }
});

module.exports = router;
