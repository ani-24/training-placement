import connectDB from "../../middleware/mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body;
    if (username && password) {
      if (username === "admin" && password === "admin") {
        res.status(200).send("Admin authorized");
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
