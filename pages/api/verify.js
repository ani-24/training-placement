import connectDB from "../../middleware/mongodb";
import auth from "../../middleware/auth";
import Student from "../../models/student";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method === "GET") {
    if (req.student) {
      res.status(200).send("Token valid");
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(auth(handler));
