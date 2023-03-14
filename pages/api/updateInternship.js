import connectDB from "../../middleware/mongodb";
import Student from "../../models/student";

const handler = async (req, res) => {
  if (req.method === "POST") {
    if (req.body) {
      const {
        companyName,
        companySector,
        jobTitle,
        jobLocation,
        positionType,
        jobFunction,
        startDate,
        endDate,
        salary,
        isWorking,
        jobDescription,
        _id,
      } = req.body;

      const query = { sid: req.body.sid };

      const updateInternship = {
        $set: {
          "internship.$[internshipData]": {
            companyName,
            companySector,
            jobTitle,
            jobLocation,
            positionType,
            jobFunction,
            startDate,
            endDate,
            salary,
            isWorking,
            jobDescription,
          },
        },
      };

      const options = {
        arrayFilters: [
          {
            "internshipData._id": _id,
          },
        ],
      };

      const result = await Student.updateMany(query, updateInternship, options);

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
