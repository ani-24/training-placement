import connectDB from "../../middleware/mongodb";
import Student from "../../models/student";

const handler = async (req, res) => {
  if (req.method === "POST") {
    if (req.body) {
      const {
        companyName,
        companySector,
        jobTitle,
        jobLocation,
        positionType,
        jobFunction,
        startDate,
        endDate,
        salary,
        isWorking,
        jobDescription,
        sid,
      } = req.body;

      const student = await Student.findOne({ sid });

      student.internship.push({
        companyName,
        companySector,
        jobTitle,
        jobLocation,
        positionType,
        jobFunction,
        startDate,
        endDate,
        salary,
        isWorking,
        jobDescription,
      });

      await student.save();

      if (student) {
        res.status(201).send("Updated");
      } else {
        res.status(401).send("Error");
      }
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
