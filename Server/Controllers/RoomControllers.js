const RoomType = require("../Models/RoomsTypesModel");
const RoomNumber = require("../Models/RoomsModel");
const Branch = require("../Models/BranchModel");
const BookedRooms = require("../Models/BookedRoomsModel");
const Reservation = require("../Models/ReservationModel");

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
    console.log(req.body.arrive);
    const branch = req.body.branch;
    //find the room with the specified branch and noOfRoom is grater or equal to 1
    await Branch.find({ branch: branch }).then((resp) => {
      resp.length > 0
        ? /*RoomNumber.find({
            branch: resp[0]._id,
          })
            .populate("RoomType")
            .exec(function (err, rooms) {
              if (err) throw err;
              var room = [];
              Promise.all(
                rooms.map((rooms) => {
                  return Reservation.find({ room: rooms._id }).exec();
                })
              )
                .then((resp) => {
                  //TODO morethan arrival date and less than departure date
                  room.push(resp);
                  console.log(resp);
                })
                .catch((err) => {
                  console.log(err);
                });
              rooms.forEach(function (rooms) {
                console.log(rooms._id);
                Reservation.find({ room: rooms._id }).exec((resp) => {
                  //TODO morethan arrival date and less than departure date
                  room.push(resp);
                });
              });
            })*/
          /*RoomNumber.aggregate(
            {
              $lookup: {
                from: "reservations",
                as: "reservations",
                let: { room: "$_id" },
                pipeline: [{ $match: { $expr: { $eq: ["$room", "$$room"] } } }],
              },
            },
            {
              $project: {
                _id: 1,
                noOfRooms: 1,
              },
            }
          ).exec((err, result) => {
            console.log(result);
          })*/ res.send("I DONT KNOW THIS")
        : res.send("Branch Not Available");
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
    req.body.firstName == undefined && res.send("no");

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
module.exports.TotalRooms = async (req, res, next) =>{
  try
  {
    
  }
  catch (e){
    next(e);
  }
}
