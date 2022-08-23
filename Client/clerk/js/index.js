window.onload = function () {
  const auth = window.localStorage.getItem("auth");
  if (!auth) {
    window.location = "../Login";
    return;
  }
  if (auth) {
    (async () => {
      await fetch("http://127.0.0.1:2001/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth.slice(1, -1),
        },
      }).then(function (response) {
        if (response.status == 400) {
          window.location = "../Login";
        }
        return response.json();
      });
    })();
  }

  (async () => {
    await fetch("http://127.0.0.1:2001/api/clerkdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": auth.slice(1, -1),
      },
    })
      .then(function (response) {
        //console.log(response.json());
        return response.json();
      })
      .then(function (data) {
        document.getElementById("total-rooms").innerHTML = data.totalrooms;
        document.getElementById("total-reservations").innerHTML =
          data.totalreservation;
      });
  })();
  (async () => {
    await fetch("http://127.0.0.1:2001/api/clerkspecific", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": auth.slice(1, -1),
      },
    })
      .then(function (response) {
        //console.log(response.json());
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  })();
};
