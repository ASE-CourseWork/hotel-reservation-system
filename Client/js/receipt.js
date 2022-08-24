const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
window.onload = function () {
  id == null && (window.location = `../`);

  (async () => {
    await fetch(`http://127.0.0.1:2001/api/reservation/reciept/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (!data) return (window.location = `../`);

        const div = `<div class="container">
        <div class="row">
          <div class="col">
            <div class="card border-secondary mb-3">
              <span class="roomID" hidden></span>
              <div class="card-header">
                <h3 class="roomType">Receipt</h3>
  
                <p>${data.firstName} ${data.lastName}</p>
                <label>Arrival</label>
                <p>${data.arrival.split("T")[0]}</p>
                <label>Depature</label>
                <p>${data.departure.split("T")[0]}</p>

              <div class="card-body text-secondary" id="allrooms">
                <br />
  </div>
                <h5>Total</h5>
  
                <div class="row">
                  <div class="col">
                    <h5 class="sub-total">Rs.${data.total}</h5>
                  </div>
  
              
                </div>
                ${
                  !data.payment
                    ? `<p class="text-danger">*Please Make Payment to save your reservation</p> </div></div> <div class="col">
                    <form id="paydetails">
                      <p class="font-weight-light">Reservation guarantee</p>
          
                      <p>Booking payment will be charged on your credit card.</p>
          
                      <div class="form-group">
                        <label for="exampleInputEmail1">Credit Card Number</label>
                        <input
                          type="number"
                          class="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="xxxx xxxx xxxx xxxx"
                          required
                        />
                      </div>
          
                      <div class="form-group">
                        <label for="exampleInputPassword1">Name on card</label>
          
                        <input
                          type="text"
                          class="form-control"
                          id="exampleInputPassword1"
                          placeholder="Your Name"
                          required
                        />
                      </div>
          
                      <div class="form-group">
                        <label for="exampleInputPassword1">Expiration date</label>
          
                        <input
                          type="text"
                          class="form-control"
                          id="exampleInputPassword1"
                          placeholder="6/25"
                          required
                        />
                      </div>
          
                      <div class="form-group">
                        <label for="exampleInputPassword1">Security code</label>
          
                        <input
                          type="text"
                          class="form-control"
                          id="exampleInputPassword1"
                          placeholder="xxx"
                          required
                        />
                        
                        <img
                          class="weAcceptImg"
                          src="../assets/img/weAccept.jpg"
                          alt=""
                        /> <button class="btn btn-primary">PAY</button>
                      </div>
                      <br />
                     
                    </form>
                  </div>`
                    : ` <p class="text-success">Your Payment is Success</p> <p>Please Copy your reservation ID - ${id}</p></p>
                    </div>
                  </div>`
                }
        </div>
      </div>
         `;
        document.getElementById("info").innerHTML = div;
        for (let i = 0; i < data.booking.length; i++) {
          document.getElementById(
            "allrooms"
          ).innerHTML += `<p class="card-text">Rooms : ${data.booking[i].room.RoomType.type} * ${data.booking[i].noOfRooms}</p>`;
        }
      });
    document.getElementById("paydetails").addEventListener("submit", (e) => {
      e.preventDefault();
      const cardNumber = e.target[0].value;
      const cardName = e.target[1].value;
      const expirydate = e.target[2].value;
      const securitycode = e.target[3].value;

      (async () => {
        await fetch("http://127.0.0.1:2001/api/pay", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cardNumber: cardNumber,
            cardName: cardName,
            expirydate: expirydate,
            securitycode: securitycode,
            reservation: id,
          }),
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            window.location.reload();
          });
      })();
    });
  })();
};
