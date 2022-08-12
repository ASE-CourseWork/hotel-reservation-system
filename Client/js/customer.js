
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
    add()
}

function add(){
    for(let i =0; i<rooms.length; i++){
        let col = document.createElement('div')
        col.classList.add('room')
        let roomsElements = document.getElementsByClassName('roomes')[0];
        let roomDivContent = 
        `  
            <div class="row">
            <div class="col">
            <h3>Best Available Rate</h3>
            <h4>${rooms[i].type}</h4>
            <p>Per Night | ${rooms[i].noOfPeople} People</p>
            </div>
            <div class="col">
            <img class="imm" src=${rooms[i].imgUrl}>
            </div>
        </div>
        <div class="row">
            <div class="col">
            <h4 class="pri">${rooms[i].price} </h4>
            </div>
            <div class="col">
            <input type="button" value="Select" class="btn btn-success" id="select">
            </div>
        </div> 
        `;
        col.innerHTML=roomDivContent;
        roomsElements.append(col)
    }
}

