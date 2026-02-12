const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema(
  {
    studentNumber: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },

    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    phoneNumber: { type: String, default: "" },
    email: { type: String, default: "" },
    program: { type: String, default: "" },

    // 2 custom fields
    favoriteTopic: { type: String, default: "" },
    strongestSkill: { type: String, default: "" },

    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Hash password before save if modified
studentSchema.pre("save", async function () {
  // Only hash if password is new or modified
  if (!this.isModified("password")) return;

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  this.password = await bcrypt.hash(this.password, salt);
});


// Compare password
studentSchema.methods.comparePassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model("Student", studentSchema);
