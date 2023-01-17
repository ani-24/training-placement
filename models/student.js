import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const student = new Schema(
  {
    sid: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      required: true,
      default: "abcd@123",
      sparse: true,
    },
  },
  { timestamps: true }
);

student.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

mongoose.models = {};

const Student = mongoose.model("Student", student);

export default Student;
