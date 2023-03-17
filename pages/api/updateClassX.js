import connectDB from "../../middleware/mongodb";
import Student from "../../models/student";

const handler = async (req, res) => {
  if (req.method === "POST") {
    if (req.body) {
      const { sid, schoolName, board, endYear, score } = req.body;
      const student = await Student.findOneAndUpdate(
        { sid },
        {
          classXEducation: {
            schoolName,
            board,
            endYear,
            score,
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
