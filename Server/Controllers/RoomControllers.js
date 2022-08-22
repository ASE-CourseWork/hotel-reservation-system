const RoomType = require("../Models/RoomsTypesModel");
const RoomNumber = require("../Models/RoomsModel");
const Branch = require("../Models/BranchModel");
const BookedRooms = require("../Models/BookedRoomsModel");
const Reservation = require("../Models/ReservationModel");
var mongoose = require("mongoose");

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
    let roooms = [];
    const branch = req.body.branch;
    //find the room with the specified branch and noOfRoom is grater or equal to 1
    await Branch.find({ branch: branch }).then((resp) => {
      if (resp.length > 0) {
        const arrive = req.body.arrive;
        const departure = req.body.departure;
        let rooms = [];
        // const rooms = [];
        RoomNumber.find({ branch: resp[0]._id })
          .populate("RoomType")
          .then((room) => {
            Reservation.find({
              branch: resp[0]._id,
              $or: [
                { arrival: { $gte: arrive, $lt: departure } },
                {
                  departure: { $gt: departure, $lt: arrive },
                },
              ],
            }).then((reservedRoom) => {
              rooms = room;
              const rooooms = "hello 1 2";
              let result = [];
              for (let i = 0; i < rooms.length; i++) {
                for (let y = 0; y < reservedRoom.length; y++) {
                  if (
                    rooms[i]._id.toString() === reservedRoom[y].room.toString()
                  ) {
                    rooms[i].noOfRoom =
                      rooms[i].noOfRoom - reservedRoom[y].noOfRooms;
                    if (rooms.indexOf(rooms[i]) == -1) {
                      console.log("room");
                      rooms.push(rooms[i]);
                      result.push(rooms[i]);
                    }
                  }
                }
                if (i == rooms.length - 1) {
                  res.json(rooms);
                }
              }
            });
          });
      } else {
        res.json("Branch Not Available");
      }
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
//
module.exports.RoomBook = async (req, res, next) => {
  try {
    req.body.firstName == undefined && res.json("no");

    const reserve = new Reservation({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      room: req.body.room,
      noOfRooms: req.body.noOfRooms,
      payment: req.body.payment,
      arrival: req.body.arrival,
      departure: req.body.departure,
      branch: req.body.branch,
    });
    await reserve.save().then((saved, error) => {
      if (error) {
        res.status(400).json("something went wrong" + error.message);
      } else {
        res.status(200).json("Reservation Added Successfully");
      }
    });
  } catch (e) {
    next(e);
  }
};
//
module.exports.TotalRooms = async (req, res, next) => {
  try {
    var branchId = mongoose.Types.ObjectId(req.user.branch);
    console.log(branchId);
    Branch.findById(branchId).then((resp) => {
      resp
        ? RoomNumber.aggregate([
            { $match: { branch: resp._id } },
            { $group: { _id: null, noOfRoom: { $sum: "$noOfRoom" } } },
          ]).then((resp) => {
            res.json(resp);
          })
        : res.json("Branch Not Found");
    });
  } catch (e) {
    next(e);
  }
};
