const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, trim: true },     // e.g. COMP308
    name: { type: String, required: true, trim: true },     // e.g. Emerging Tech
    section: { type: String, required: true, trim: true },  // e.g. 001
    semester: { type: String, required: true, trim: true }, // e.g. Winter 2026

    // Link students via ObjectId refs
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
