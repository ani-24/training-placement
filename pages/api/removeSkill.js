import connectDB from "../../middleware/mongodb";
import Student from "../../models/student";

const handler = async (req, res) => {
  if (req.method === "POST") {
    if (req.body) {
      const { sid, skill, level, id } = req.body;
      const query = { sid };

      const updateSkill = {
        $pull: {
          skills: { skill, level, _id: id },
        },
      };

      const result = await Student.updateMany(query, updateSkill);

      if (result) {
        res.status(201).send("Updated");
      } else {
        res.status(401).send(result);
      }
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
