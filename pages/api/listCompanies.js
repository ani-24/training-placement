import connectDB from "../../middleware/mongodb";
import Company from "../../models/company";
import Student from "../../models/student";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      if (req.body) {
        const student = await Student.findOne({ sid: req.body.sid });
        const companies = await Company.find({});
        const eligibleCompany = [];
        const studentObj = student.toObject();
        companies.forEach((el) => {
          if (
            parseInt(studentObj.classXEducation?.score) >=
              parseInt(el.classXmarks) &&
            parseInt(studentObj.classXIIEducation?.score) >=
              parseInt(el.classXIImarks) &&
            parseInt(studentObj.currentEducation?.score) >= parseInt(el.cgpa)
          ) {
            eligibleCompany.push(el);
          }
        });
        res.status(201).json({ companies: eligibleCompany });
      }
    } catch (error) {
      res.status(401).json({ message: error });
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
