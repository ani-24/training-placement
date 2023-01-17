import connectDB from "../../middleware/mongodb";
import Student from "../../models/student";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { sid } = req.body;
    console.log(sid);
    if (sid) {
      try {
        const student = new Student({
          sid,
        });
        // Create new user
        const studentcreated = await student.save();
        return res.status(200).send(studentcreated);
      } catch (error) {
        return res.status(500).send(error.message);
      }
    } else {
      res.status(422).send("data_incomplete");
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
