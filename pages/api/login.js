import connectDB from "../../middleware/mongodb";
import Student from "../../models/student";
import bcrypt from "bcrypt";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { sid, password } = req.body;
    const studentExists = await Student.findOne({ sid });
    if (studentExists) {
      const hashedPass = await bcrypt.compare(password, studentExists.password);
      if (hashedPass) {
        res.status(200).send("Logged in");
      } else {
        res.status(400).send("Invalid credentials");
      }
    } else {
      res.status(400).send("Invalid credentials");
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
