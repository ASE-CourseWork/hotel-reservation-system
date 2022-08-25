document.getElementById("branchdetails").addEventListener("submit", (e) => {
  e.preventDefault();
  const branchName = e.target[0].value;
  const branchNumber = e.target[1].value;
  const clerkName = e.target[2].value;
  const email = e.target[3].value;
  const password = e.target[4].value;
  const singleBedNo = e.target[5].value;
  const deluxeNo = e.target[6].value;
  const suiteNo = e.target[7].value;

  let rooms = [
    { roomtype: "Single Bed", noofroom: singleBedNo },
    { roomtype: "Deluxe", noofroom: deluxeNo },
    { roomtype: "Suite", noofroom: suiteNo },
  ];
  (async () => {
    await fetch("http://127.0.0.1:2001/api/branch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        branch: branchName,
        number: branchNumber,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        if (data == "Branch Added Successfully") {
          (async () => {
            await fetch("http://127.0.0.1:2001/api/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: clerkName,
                email: email,
                password: password,
                account: "Clerk",
                branch: branchName,
              }),
            })
              .then(function (response) {
                return response.json();
              })
              .then(function (data) {
                console.log(data);
                if (data == "Registration success") {
                  for (let i = 0; i < rooms.length; i++) {
                    (async () => {
                      await fetch("http://127.0.0.1:2001/api/roomnumber", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          roomtype: rooms[i].roomtype,
                          noOfRoom: rooms[i].noofroom,
                          branch: branchName,
                        }),
                      })
                        .then(function (response) {
                          return response.json();
                        })
                        .then(function (data) {
                          console.log(data);
                        });
                    })();
                  }
                }
              });
          })();
        }
      });
  })();
});
