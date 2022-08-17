const RoomType = require("../Models/RoomsTypesModel");
const RoomNumber = require("../Models/RoomsModel");
const Branch = require("../Models/BranchModel");

module.exports.InsertData = async (req, res, next) => {
  try {
    //insert room type
    const roomtype = new RoomType({
      type: req.body.type,
      noOfPeople: req.body.noOfPeople,
      price: req.body.price,
      imgUrl: req.body.imgUrl,
      desc: req.body.desc,
    });
    await roomtype.save().then((saved, error) => {
      if (error) {
        res.status(400).json("something went wrong" + error.message);
      } else {
        res.status(200).json("Room Type Added Successfully");
      }
    });
  } catch (err) {
    next(err);
  }
};
//get all available rooms
module.exports.GetData = async (req, res, next) => {
  try {
    const branch = req.body.branch;
    //find the room with the specified branch and noOfRoom is grater or equal to 1
    await Branch.find({ branch: branch }).then((resp) => {
      RoomNumber.find({ branch: resp[0]._id, noOfRoom: { $gte: 1 } })
        .populate("RoomType")
        .populate("branch", "branch")
        .then((resp) => {
          (resp.length > 0 && res.send(resp)) || res.send("No Room Available");
        });
    });
  } catch (err) {
    next(err);
  }
};

//insert room number and branch for each roomtypes
module.exports.RoomNumber = async (req, res, next) => {
  try {
    const roomnumber = new RoomNumber({
      RoomType: req.body.roomtype,
      noOfRoom: req.body.noOfRoom,
      branch: req.body.branch,
    });
    await roomnumber.save().then((saved, error) => {
      if (error) {
        res.status(400).json("something went wrong" + error.message);
      } else {
        res.status(200).json("Number of Room Added Successfully");
      }
    });
  } catch (err) {
    next(err);
  }
};

//insert branches
module.exports.Branch = async (req, res, next) => {
  try {
    const user = await User.findOne({ branch: req.body.branch });
    if (user) return res.status(400).json("Branch Already exists");

    const branch = new Branch({
      branch: req.body.branch,
      number: req.body.number,
    });
    await branch.save().then((saved, error) => {
      if (error) {
        res.status(400).json("something went wrong" + error.message);
      } else {
        res.status(200).json("Branch Added Successfully");
      }
    });
  } catch (err) {
    next(err);
  }
};
