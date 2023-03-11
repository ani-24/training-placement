import connectDB from "../../middleware/mongodb";
import Student from "../../models/student";

const handler = async (req, res) => {
  if (req.method === "POST") {
    if (req.body) {
      const student = await Student.findOneAndUpdate(
        { sid: req.body.sid },
        {
          fname: req.body.fname,
          lname: req.body.lname,
          dob: req.body.dob,
          college: req.body.college,
          course: req.body.course,
          batch: req.body.batch,
          roll: req.body.roll,
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
