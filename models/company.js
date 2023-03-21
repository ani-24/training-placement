import mongoose from "mongoose";

const Schema = mongoose.Schema;

const company = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    classXmarks: String,
    classXIImarks: String,
    cgpa: String,
    form: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    jobLocation: {
      type: String,
      required: true,
    },
    deadline: String,
  },
  { timestamps: true }
);

mongoose.models = {};

const Company = mongoose.model("Company", company);

export default Company;
