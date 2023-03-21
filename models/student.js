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
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
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
    classXEducation: {
      schoolName: String,
      board: String,
      endYear: String,
      score: String,
    },
    classXIIEducation: {
      schoolName: String,
      board: String,
      stream: String,
      endYear: String,
      score: String,
    },
    currentEducation: {
      program: String,
      branch: String,
      semester: String,
      rollNo: String,
      startDate: String,
      endDate: String,
      score: String,
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
    skills: [
      {
        skill: String,
        level: String,
      },
    ],
    resume: String,
  },
  { timestamps: true }
);

student.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    return next();
  } else {
    return next();
  }
});

mongoose.models = {};

const Student = mongoose.model("Student", student);

export default Student;
