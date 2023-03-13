import connectDB from "../../middleware/mongodb";
import Student from "../../models/student";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { sid } = req.body;
    if (sid) {
      try {
        const student = new Student({
          sid,
          password: process.env.STUDENT_DEFAULT_PASS,
        });
        await student.save();
        res.status(201).send(student);
      } catch (error) {
        res.status(500).send(error.message);
      }
    } else {
      res.status(422).send("data_incomplete");
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
