import connectDB from "../../middleware/mongodb";
import Student from "../../models/student";
const bcrypt = require("bcrypt");

const handler = async (req, res) => {
  if (req.method === "POST") {
    if (req.body) {
      const { _id, current, newPass } = req.body;
      const student = await Student.findById({ _id });

      const passwordMatch = await bcrypt.compare(current, student.password);
      if (passwordMatch) {
        const newPassHash = await bcrypt.hash(newPass, 10);
        await student.updateOne({ password: newPassHash });
        if (student) {
          res.status(201).json({ message: "Updated" });
        } else {
          res.status(401).json({ message: "Error" });
        }
      } else {
        res.status(401).json({ message: "Incorrent Password" });
      }
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
