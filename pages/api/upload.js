import connectDB from "../../middleware/mongodb";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "drwuytqnc",
  api_key: "593577281444417",
  api_secret: "a0p89r3mIzq7ukR24Hbn_fPDX1U",
  secure: true,
});

const handler = async (req, res) => {
  if (req.method === "POST") {
    if (req.body) {
      const { file } = req.body;
      console.log(req.body);
      cloudinary.uploader
        .upload(file)
        .then((result) => {
          res.status(201).send(result);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb", // Set desired value here
    },
  },
};

export default connectDB(handler);
