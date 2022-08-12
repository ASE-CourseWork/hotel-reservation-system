
let rooms=[
    {
        id:1,
        type:'duluxe',
        noOfPeople:2,
        price:'Rs 10,000',
        imgUrl:'https://damro.lk/menu/wp-content/uploads/2021/02/16.jpg',
    },          
    {
        id:2,
        type:'single Bed',
        noOfPeople:1,
        price:'Rs 5,000',
        imgUrl:'https://damro.lk/menu/wp-content/uploads/2021/02/16.jpg',

    },
    {
        id:3,
        type:'suit',
        noOfPeople:5,
        price:'Rs 70,000',
        imgUrl:'https://damro.lk/menu/wp-content/uploads/2021/02/16.jpg',

    },
    {
        id:4,
        type:'villa',
        noOfPeople:3,
        price:'Rs 7,000',
        imgUrl:'https://damro.lk/menu/wp-content/uploads/2021/02/16.jpg',

    }
];

window.onload = function() {
    generateRooms();
    selectRoomButtons();
}

function generateRooms(){
    for(let i =0; i<rooms.length; i++){
        let col = document.createElement('div')
        col.classList.add('room')
        let roomsElements = document.getElementsByClassName('roomes')[0];
        let roomDivContent = 
        ` 
        <div class="roomDetails">
            <div class="row">
                <div class="col">
                    <h5>Best Available Rate</h5>
                    <h4 class="roomType">${rooms[i].type.toUpperCase()}</h4>
                    <p class="noOfPeople">Per Night | ${rooms[i].noOfPeople} People</p>
                </div>
                <div class="col">
                    <img class="imm" src=${rooms[i].imgUrl}>
                </div>
            </div>
            <div class="row secondCol">
                <div class="col-4">
                    <h4 class="price" class="pri">${rooms[i].price} </h4>
                </div>
                <div class="col-4">
                    <input type="number" min="1" class="quantity" style="width: 45px" value="1">     
                </div>
                <div class="col-2 selectRoomDiv">
                    <input type="button" value="Select" class="addRoomBtn btn btn-success" id="select">
                </div>
            </div> 
        </div> 
        `;
        col.innerHTML=roomDivContent;
        roomsElements.append(col)
    }
}

function selectRoomButtons(){

    let addButtons = document.getElementsByClassName('addRoomBtn')
    for(let i=0; i <addButtons.length; i++){
        let button = addButtons[i]
        button.addEventListener('click', passRoom)
    }
}



function passRoom(event){
    let button = event.target
    let roomItem = button.parentElement.parentElement.parentElement
    let title = roomItem.getElementsByClassName('roomType')[0].innerText;
    let peoCount = roomItem.getElementsByClassName('noOfPeople')[0].innerText;
    let price = parseFloat(roomItem.getElementsByClassName('price')[0].innerText.replace('Rs','')) 
    price+='000'
    let quantity = roomItem.getElementsByClassName('quantity')[0].value;
    let total = price*quantity ; 
    price+='Rs ' + price
    addToCart(title,total,quantity,peoCount)
}


function addToCart(title,total,quantity,peoCount){
        let col = document.createElement('div')
        col.classList.add('cart')
        let roomsElements = document.getElementsByClassName('roomContent')[0];
        let name = roomsElements.getElementsByClassName('roomType')

        for(let i=0; i<name.length;i++){
            if(name[i].innerText == title){
                alert('This Room Type is Already Selected!')
                return
            }
        }



        let roomDivContent = 
        ` 
        <div class="card border-secondary mb-3">
            <div class="card-header">
              <h3 class="roomType" >${title.toUpperCase()}</h3>
              <p>${peoCount}</p>
            </div>
            <div class="card-body text-secondary">
              <h5 class="card-title">Rooms : ${quantity}</h5>
              <p class="card-text">Breakfast, Lunch & Dinner<br>free Wifi & Room services</p>
              <br>
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
        col.innerHTML=roomDivContent;
        roomsElements.append(col)

        let removeButtons = document.getElementsByClassName('btn-danger')
        console.log(removeButtons);
        for(let i=0; i <removeButtons.length; i++){
            let button = removeButtons[i]
            button.addEventListener('click', removeRoom)
        }
        calTotal();
}

function removeRoom(event){
    let button = event.target;
    let cartBox = button.parentElement.parentElement.parentElement.parentElement.remove()
    calTotal();
}


function calTotal(){
    let totalCart=0;
    let x;
    let allRoomPrices = document.getElementsByClassName('sub-total')
    for(let i=0; i <allRoomPrices.length; i++){
        x = allRoomPrices[i].innerText.replace('Rs. ','')
        x = x/1
        totalCart += x
    }
    console.log(totalCart)


    let roomTotal = document.getElementsByClassName('totalPrice')[0];
    console.log(roomTotal);
    roomTotal.innerText = `Rs.${totalCart.toLocaleString()}`
}