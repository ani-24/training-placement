// import connectDB from "../../middleware/mongodb";
// import uploadImg from "../../utils/upload";
// // const cloudinary = require("cloudinary").v2;

// // cloudinary.config({
// //   cloud_name: "drwuytqnc",
// //   api_key: "593577281444417",
// //   api_secret: "a0p89r3mIzq7ukR24Hbn_fPDX1U",
// // });

// const handler = async (req, res) => {
//   if (req.method === "POST") {
//     const { img } = req.body;
//     console.log(img);
//     if (img) {
//       const result = await uploadImg(img);
//       console.log(result);
//       if (result) {
//         res.status(200).send(result);
//       } else {
//         res.status(400).send("Error");
//       }
//     }
//   } else {
//     res.status(422).send("req_method_not_supported");
//   }
// };

// export default connectDB(handler);
