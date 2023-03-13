import connectDB from "../../middleware/mongodb";
import Student from "../../models/student";

const handler = async (req, res) => {
  if (req.method === "POST") {
    if (req.body) {
      const { sid, skill, level } = req.body;
      const student = await Student.findOne({ sid });

      student.skills.push({
        skill,
        level,
      });

      await student.save();

      if (student) {
        res.status(201).send("Added");
      } else {
        res.status(401).send("Error");
      }
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
