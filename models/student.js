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
    avatar: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/drwuytqnc/image/upload/v1674054349/7309689_zhdbc8.jpg",
    },
    fname: String,
    lname: String,
    dob: String,
    college: String,
    course: String,
    batch: String,
    roll: String,
    education: {
      program: String,
      branch: String,
      semester: String,
      instituteRollNo: String,
      courseStartDate: String,
      courseEndDate: String,
    },
    internship: [
      {
        companyName: String,
        companySector: String,
        jobTitle: String,
        jobLocation: String,
        positionType: String,
        jobFunction: String,
        startDate: String,
        endDate: String,
        salary: String,
        isWorking: Boolean,
        jobDescription: String,
      },
    ],
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
