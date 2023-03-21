import connectDB from "../../middleware/mongodb";
import Company from "../../models/company";
import Student from "../../models/student";
const nodemailer = require("nodemailer");

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      if (req.body) {
        const company = new Company(req.body);
        await company.save();
        const students = await Student.find({});
        const eligibleStudents = [];
        const companyObj = company.toObject();
        students.forEach((el) => {
          if (
            parseInt(companyObj.classXmarks) <=
              parseInt(el.classXEducation?.score) &&
            parseInt(companyObj.classXIImarks) <=
              parseInt(el.classXIIEducation?.score) &&
            parseInt(companyObj.cgpa) <= parseInt(el.currentEducation?.score)
          ) {
            eligibleStudents.push(el);
          }
        });
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "aniketkumar2427@gmail.com", // generated ethereal user
            pass: "rgnyknagylaqwouk", // generated ethereal password
          },
        });
        let info = await transporter.sendMail({
          from: "aniketkumar2427@gmail.com", // sender address
          to: eligibleStudents.map((std) => std.email), // list of receivers
          subject: "We've found a company matching your profile!", // Subject line
          html: `Dear student,<br>This is to inform you that you're eligible to apply in <b>${company.name}</b> for the position of <strong>${company.role}</strong><br>About ${company.name}:<br>\t${company.about}<br><strong>Job Location:</strong> ${company.jobLocation}<br><strong>Last date to submit the form:</strong> ${company.deadline}`, // html body
        });
        console.log(info);
        res.status(201).json({ message: "Added", eligibleStudents });
      }
    } catch (error) {
      res.status(401).json({ message: error });
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
