require("dotenv").config();
const mongoose = require("mongoose");
const Student = require("./models/Student");

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const existing = await Student.findOne({ studentNumber: "admin001" });
    if (existing) {
      console.log("Admin already exists.");
      process.exit();
    }

    const admin = await Student.create({
      studentNumber: "admin001",
      password: "Admin123!", // will be hashed automatically
      firstName: "System",
      lastName: "Admin",
      address: "N/A",
      city: "N/A",
      phoneNumber: "0000000000",
      email: "admin@school.com",
      program: "Administration",
      favoriteTopic: "Management",
      strongestSkill: "Leadership",
      isAdmin: true,
    });

    console.log("Admin created successfully!");
    console.log("Login with:");
    console.log("Student Number: admin001");
    console.log("Password: Admin123!");

    process.exit();
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

seedAdmin();
