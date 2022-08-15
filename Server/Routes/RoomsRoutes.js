const router = require("express").Router();
const Room = require("../Controllers/RoomControllers");

//Get Room Type
router.post("/rooms", Room.GetData);

//Insert Room Type
router.post("/roomtype", Room.InsertData);

//insert roomnumbers
router.post("/roomnumber", Room.RoomNumber);

module.exports = router;
