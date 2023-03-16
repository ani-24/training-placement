import connectDB from "../../middleware/mongodb";
import Student from "../../models/student";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { sid, schoolName, board, stream, endYear, score } = req.body;

    if (req.body) {
      const student = await Student.findOneAndUpdate(
        { sid },
        {
          classXIIEducation: {
            schoolName,
            board,
            stream,
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
