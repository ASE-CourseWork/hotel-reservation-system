const router = require("express").Router();
const Room = require("../Controllers/RoomControllers");
const verify = require("./auth");
//insert branches
router.post("/branch", Room.Branch);

router.get("/branch", Room.loadbranch);

//Get Room Type
router.post("/rooms", Room.GetData); //all users

//Insert Room Type
router.post("/roomtype", Room.InsertData);

//insert roomnumbers
router.post("/roomnumber", Room.RoomNumber);

//rooms book
router.post("/roomsbook", Room.RoomBook); //all users

//get total rooms
router.post("/clerkdata", verify, Room.TotalRooms);

router.post("/clerkspecific", verify, Room.specificrooms);

router.get("/reservation/reciept/:id", Room.reciept);

router.post("/pay", Room.pay);

router.post("/checkin", verify, Room.checkin);

router.post("/addcoupon", Room.addcoupon);

router.post("/getcoupon", Room.getcoupon);

router.post("/reservationsearch", verify, Room.reservationsearch);

module.exports = router;
