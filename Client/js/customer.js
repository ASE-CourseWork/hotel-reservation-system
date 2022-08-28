let rooms = [];

//get the branch name from the url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const branch = urlParams.get("branch");
const date = urlParams.get("a");
const arrive = date.split(" ")[0];
const departure = date.split(" ")[1];
const coupon = urlParams.get("c");
let discount = 0;
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
let socket = io("http://localhost:2001");
window.onload = function () {
  if (branch) {
    socket.emit("join-room", branch);
  }
  (async () => {
    await fetch("http://127.0.0.1:2001/api/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        branch: branch,
        arrive: arrive,
        departure: departure,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        rooms = data;
        generateRooms();
        selectRoomButtons();
      });
  })();
  if(coupon)
  {
    console.log(coupon);
    (async () => {
      await fetch("http://127.0.0.1:2001/api/getcoupon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({coupon: coupon})
      })
        .then(function (response) {
          return response.json();//
        })
        .then(function (data) {
         if(data != "invalid coupon")
         {
          discount = data;
          
          
         }
        //  console.log(data != "invalid coupon");
      });
    })();
  }
};
window.onunload = function () {
  socket.close();
};
////todo :
function generateRooms() {
  rooms.length <= 0 ? console.log("no rooms") : console.log(rooms);
  for (let i = 0; i < rooms.length; i++) {
    let col = document.createElement("div");
    col.classList.add("room");
    let roomsElements = document.getElementsByClassName("roomDetails")[0];
    let roomDivContent = `
            <div class="row">
                <div class="col">
                <span class="roomID" hidden>${rooms[i]._id}</span>
                    <h5>Best Available Rate</h5>
                    <h4 class="roomType">${rooms[
                      i
                    ].RoomType.type.toUpperCase()}</h4>
                    <p class="noOfPeople">Per Night | ${
                      rooms[i].RoomType.noOfPeople
                    } People</p>
                </div>
                <div class="col">
                    <img class="imm" src=${rooms[i].RoomType.imgUrl}>
                </div>
            </div>
            <div class="row secondCol">
                <div class="col-4">
                    <h4 class="price" class="pri">Rs. ${
                      rooms[i].RoomType.price
                    } </h4>
                </div>
                <div class="col-4">
                    <input type="number" min="1" max= ${
                      rooms[i].noOfRoom
                    } class="quantity" style="width: 45px" value="1"> Rooms - <h5>${
      rooms[i].noOfRoom
    }</h5>     
                </div>
                <div class="col-2 selectRoomDiv">
                    <input type="button" value="Select" class="addRoomBtn btn btn-success" id="select">
                </div>
            </div> 
        `;
    col.innerHTML = roomDivContent;
    roomsElements.append(col);
  }
}

function selectRoomButtons() {
  let addButtons = document.getElementsByClassName("addRoomBtn");
  for (let i = 0; i < addButtons.length; i++) {
    let button = addButtons[i];
    button.addEventListener("click", passRoom);
  }
}

function passRoom(event) {
  let button = event.target;
  let roomItem = button.parentElement.parentElement.parentElement;
  let id = roomItem.getElementsByClassName("roomID")[0].innerText;
  let title = roomItem.getElementsByClassName("roomType")[0].innerText;
  let peoCount = roomItem.getElementsByClassName("noOfPeople")[0].innerText;
  let price = parseFloat(
    roomItem.getElementsByClassName("price")[0].innerText.replace("Rs.", "")
  );
  let quantity = roomItem.getElementsByClassName("quantity")[0].value;
  let total = price * quantity;
  price += "Rs " + price;
  addToCart(title, total, quantity, peoCount, id);
}
//update room numbers realtime
socket.on("changeData", (event) => {
  const roomes = event.fullDocument;
  //const roomID = event.fullDocument.room;
  const arrival = event.fullDocument.arrival;
  const departuree = event.fullDocument.departure;

  if (
    (arrival > arrive && arrival < departure) ||
    (departuree > departure && departuree < arrive)
  ) {
    for (let i = 0; i < roomes.booking.length; i++) {
      var itemIndex = rooms.findIndex((x) => x._id == roomes.booking[i].room);
      var item = rooms[itemIndex];
      item.noOfRoom = item.noOfRoom - roomes.booking[i].noOfRooms;
      rooms[itemIndex] = item;
    }
  }
  const e = document.getElementsByClassName("roomDetails")[0];
  var child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
  generateRooms();
  selectRoomButtons();
});
function addToCart(title, total, quantity, peoCount, id) {
  let col = document.createElement("div");
  col.classList.add("cart");
  let roomsElements = document.getElementsByClassName("roomContent")[0];
  let name = roomsElements.getElementsByClassName("roomType");
  for (let i = 0; i < name.length; i++) {
    if (name[i].innerText == title) {
      alert("This Room Type is Already Selected!");
      return;
    }
  }
  
  const d1 = new Date(departure);
  const d2 = new Date(arrive);
  const days = Math.abs(d1 - d2) / 1000 / 60 / 60 / 24;
  total = total * days;
  console.log(id);
  let roomDivContent = `
        <div class="card border-secondary mb-3"><span class="roomID" hidden >${id}</span>
            <div class="card-header">
              <h3 class="roomType" >${title.toUpperCase()}</h3>
              <p>${peoCount}</p>
            </div>
            <div class="card-body text-secondary">
              <h5 class="card-title roomquant">Rooms : ${quantity}</h5>
              <p class="card-text">Breakfast, Lunch & Dinner<br>free Wifi & Room services</p>
              <br>
              <h5>${days} Night</h5>
              <h5>Total</h5>
              <div class="row">
                <div class="col">
                  <h5 class="sub-total">Rs. ${total}</h5>
                </div>
                <div class="col">
                  <button class="btn btn-danger removeRoom" id="delete">Delete</button>
                </div>
              </div>
            </div>
          </div>
        `;
  col.innerHTML = roomDivContent;
  roomsElements.append(col);

  let removeButtons = document.getElementsByClassName("btn-danger");
  for (let i = 0; i < removeButtons.length; i++) {
    let button = removeButtons[i];
    button.addEventListener("click", removeRoom);
  }
  calTotal();
}

function removeRoom(event) {
  let button = event.target;
  let cartBox =
    button.parentElement.parentElement.parentElement.parentElement.remove();
  calTotal();
}

function calTotal() {
  let totalCart = 0;
  let x;
  let allRoomPrices = document.getElementsByClassName("sub-total");
  for (let i = 0; i < allRoomPrices.length; i++) {
    x = allRoomPrices[i].innerText.replace("Rs. ", "");
    x = x / 1;
    totalCart += x;
  }
  console.log(discount);
  console.log(totalCart * (discount / 100));
  discount>0? totalCart = (totalCart) - totalCart * (discount / 100): totalCart;
  let roomTotal = document.getElementsByClassName("totalPrice")[0];
  console.log(roomTotal);
  roomTotal.innerText = `Rs.${ totalCart.toLocaleString()}`;
}

document.getElementById("userdetails").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = e.target[0].value;
  const first_name = e.target[1].value;
  const last_name = e.target[2].value;
  const phone = e.target[3].value;
  const rooms = document.getElementById("room_list");
  const alroom = rooms.children;
  let booking = [];
  if (alroom.length > 0) {
    for (let i = 0; i < alroom.length; i++) {
      const quantity = alroom[i]
        .getElementsByClassName("roomquant")[0]
        .innerText.split(":")[1]
        .slice(-1);
      const roomID = alroom[i].getElementsByClassName("roomID")[0].innerText;
      booking.push({ room: roomID, noOfRooms: parseInt(quantity) });
    }
  } else {
    console.log("please select a room");
    return;
  }
  const total = document
    .getElementById("total")
    .innerText.split(".")[1]
    .split(",")
    .join("");
  (async () => {
    await fetch("http://127.0.0.1:2001/api/roomsbook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: first_name,
        lastName: last_name,
        email: email,
        phoneNumber: phone,
        booking: booking,
        arrival: arrive,
        departure: departure,
        payment: false,
        branch: branch,
        total: total,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        window.location = data;
      });
  })();
});
