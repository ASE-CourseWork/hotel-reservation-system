const router = require("express").Router();
const Room = require("../Controllers/RoomControllers");

//insert branches
router.post("/branch", Room.Branch);

//Get Room Type
router.post("/rooms", Room.GetData);

//Insert Room Type
router.post("/roomtype", Room.InsertData);

//insert roomnumbers
router.post("/roomnumber", Room.RoomNumber);

//rooms book
router.post("/roomsbook", Room.RoomBook);
router.post("/totalrooms", Room.TotalRooms);
module.exports = router;
