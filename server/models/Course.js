const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, trim: true },     
    name: { type: String, required: true, trim: true },     
    section: { type: String, required: true, trim: true },  
    semester: { type: String, required: true, trim: true }, 

    // Link students via ObjectId refs
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
