import connectDB from "../../middleware/mongodb";
import Company from "../../models/company";
import Student from "../../models/student";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      if (req.body) {
        const { _id } = req.body;
        const company = await Company.findOne({ _id });
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
        res.status(201).json({ students: eligibleStudents });
      }
    } catch (error) {
      res.status(401).json({ message: error });
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
