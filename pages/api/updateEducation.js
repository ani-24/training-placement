import connectDB from "../../middleware/mongodb";
import Student from "../../models/student";

const handler = async (req, res) => {
  if (req.method === "POST") {
    if (req.body) {
      const student = await Student.findOneAndUpdate(
        { sid: req.body.sid },
        {
          education: {
            program: req.body.program,
            branch: req.body.major,
            semester: req.body.semester,
            instituteRollNo: req.body.roll,
            courseStartDate: req.body.courseStart,
            courseEndDate: req.body.courseEnd,
          },
        }
      );
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
