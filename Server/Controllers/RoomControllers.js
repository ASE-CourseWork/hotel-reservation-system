require("dotenv").config();
const RoomType = require("../Models/RoomsTypesModel");
const RoomNumber = require("../Models/RoomsModel");
const Branch = require("../Models/BranchModel");
const BookedRooms = require("../Models/BookedRoomsModel");
const Reservation = require("../Models/ReservationModel");
const Payment = require("../Models/PaymentDetailsModel");
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
        res.status(201).json("Room Type Added Successfully");
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
              for (let i = 0; i < rooms.length; i++) {
                for (let y = 0; y < reservedRoom.length; y++) {
                  for (let x = 0; x < reservedRoom[y].booking.length; x++) {
                    if (
                      rooms[i]._id.toString() ===
                      reservedRoom[y].booking[x].room.toString()
                    ) {
                      rooms[i].noOfRoom =
                        rooms[i].noOfRoom -
                        reservedRoom[y].booking[x].noOfRooms;
                      if (rooms.indexOf(rooms[i]) == -1) {
                        rooms.push(rooms[i]);
                      }
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
    await Branch.find({ branch: req.body.branch }).then((resp) => {
      const branch = resp[0]._id;
      resp
        ? RoomType.find({ type: req.body.roomtype }).then((resp) => {
            const type = resp[0]._id;
            RoomNumber.find({
              branch: branch,
              RoomType: type,
            }).then((resp) => {
              if (resp.length > 0) return res.json("Room Available");
              let room = [];
              let prefix = req.body.roomtype;
              /\s/g.test(prefix)
                ? (prefix =
                    prefix.split(" ")[0].charAt(0) +
                    prefix.split(" ")[1].charAt(0))
                : (prefix = prefix.charAt(0));
              for (let i = 0; i < req.body.noOfRoom; i++) {
                let j = i + 1;
                room.push({
                  ID: prefix + j.toString().padStart(4, "0"),
                  status: true,
                });
              }
              const roomnumber = new RoomNumber({
                RoomType: type,
                noOfRoom: req.body.noOfRoom,
                branch: branch,
                room: room,
              });
              roomnumber.save().then((saved, error) => {
                if (error) {
                  res.status(400).json("something went wrong" + error.message);
                } else {
                  res.status(201).json("Number of Room Added Successfully");
                }
              });
            });
          })
        : res.json("branch not found");
    });
  } catch (err) {
    next(err);
  }
};

//insert branches
module.exports.Branch = async (req, res, next) => {
  try {
    const branches = await Branch.findOne({ branch: req.body.branch });
    if (branches) return res.status(400).json("Branch Already exists");

    const branch = new Branch({
      branch: req.body.branch,
      number: req.body.number,
    });
    await branch.save().then((saved, error) => {
      if (error) {
        res.status(400).json("something went wrong" + error.message);
      } else {
        res.status(201).json("Branch Added Successfully");
      }
    });
  } catch (err) {
    next(err);
  }
};
//book rooms and redirect to reciept
module.exports.RoomBook = async (req, res, next) => {
  try {
    req.body.firstName == undefined && res.json("no");
    await Branch.find({ branch: req.body.branch }).then((resp) => {
      const reserve = new Reservation({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        booking: req.body.booking,
        payment: req.body.payment,
        arrival: req.body.arrival,
        departure: req.body.departure,
        branch: resp[0]._id,
        total: req.body.total,
      });
      reserve.save().then((saved, error) => {
        if (error) {
          res.status(400).json("something went wrong" + error.message);
        } else {
          res
            .status(201)
            .json(
              `http://127.0.0.1:5500/Client/customer/receipt.html?id=${saved._id}`
            );
        }
      });
    });
  } catch (e) {
    next(e);
  }
};

//get total rooms for each branch to clerk dashboard
module.exports.TotalRooms = async (req, res, next) => {
  try {
    var branchId = mongoose.Types.ObjectId(req.user.branch);
    RoomNumber.aggregate([
      { $match: { branch: branchId } },
      { $group: { _id: null, noOfRoom: { $sum: "$noOfRoom" } } },
    ]).then((resp) => {
      if (resp.length <= 0) return res.json("no Rooms");
      let totalrooms = resp[0].noOfRoom;
      Reservation.find({ branch: branchId }).then((resp) => {
        let totalreservation = resp.length > 0 ? resp.length : 0;
        BookedRooms.find({ branch: branchId }).then((resp) => {
          let totalbooked = resp.length > 0 ? resp.length : 0;
          res.json({ totalrooms, totalreservation, totalbooked });
        });
      });
    });
  } catch (e) {
    next(e);
  }
};
//get number of each room for the clerk's branch
module.exports.specificrooms = async (req, res, next) => {
  try {
    var branchId = mongoose.Types.ObjectId(req.user.branch);
    Branch.findById(branchId).then((resp) => {
      resp
        ? RoomNumber.find({ branch: resp._id }, "-branch")
            .populate("RoomType", "type -_id")
            .then((resp) => {
              res.send(resp);
            })
        : res.json("Branch Not Found");
    });
  } catch (e) {
    next(e);
  }
};
//get the reciept details with the reservation ID
module.exports.reciept = async (req, res, next) => {
  try {
    Reservation.findById(req.params.id)
      .populate({
        path: "booking.room",
        select: "_id",
        populate: {
          path: "RoomType",
          select: "type -_id",
        },
      })
      .then((resp, err) => {
        if (err) return res.json(false);
        res.json(resp);
      })
      .catch((e) => {
        res.send(false);
      });
  } catch (e) {
    next(e);
  }
};
//make the payment for the reservation
module.exports.pay = async (req, res, next) => {
  try {
    var reservation = mongoose.Types.ObjectId(req.body.reservation);
    const payment = new Payment({
      cardNumber: req.body.cardNumber,
      cardName: req.body.cardName,
      expirydate: req.body.expirydate,
      securitycode: req.body.securitycode,
      reservation: reservation,
    });
    await Reservation.findByIdAndUpdate(reservation, { payment: true }).then(
      (resp) => {
        payment.save().then((save, err) => {
          if (err) return res.json(false);
          res.json(save);
        });
      }
    );
  } catch (e) {
    next(e);
  }
};
//checkin the reserved customers
module.exports.checkin = async (req, res, next) => {
  const booking = new BookedRooms({
    reservation: req.body.reservation,
    roomsBooked: req.body.noOfRoom,
    branch: req.body.branch,
  });
  await booking.save().then((saved, error) => {
    if (error) return res.json(false);
    res.json(saved);
  });
};

module.exports.reservationsearch = async (req, res, next) => {
  if (req.body.reservationID.match(/^[0-9a-fA-F]{24}$/)) {
    var id = mongoose.Types.ObjectId(req.body.reservationID);
    let reserve = await Reservation.findById(id);
    let roomID = [];
    if (reserve) {
      for (let i = 0; i < reserve.booking.length; i++) {
        let room = await RoomNumber.aggregate([
          {
            $match: {
              _id: reserve.booking[i].room,
            },
          },
          {
            $project: {
              room: {
                $filter: {
                  input: "$room",
                  as: "rooms",
                  cond: {
                    $eq: ["$$rooms.status", true],
                  },
                },
              },
            },
          },
        ]);
        roomID.push(room[0].room.slice(0, reserve.booking[i].noOfRooms));
      }
      let rese = [];

      rese.push({ reserve, roomID });

      return res.status(200).json(rese[0]);
    }
    res.status(400).json("Invalid reservationID");
  }
  res.status(400).json("Invalid reservationID");
};

var cron = require("node-cron");

cron.schedule("01 30 19 * * *", () => {
  Reservation.deleteMany({ payment: false }).then((e) => {
    console.log(e);
  });
});
