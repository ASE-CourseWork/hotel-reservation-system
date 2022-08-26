let datas = [];
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
        console.log(data);
        document.getElementById("total-rooms") != null &&
          (document.getElementById("total-rooms").innerHTML = data.totalrooms);
        document.getElementById("total-reservations") != null &&
          (document.getElementById("total-reservations").innerHTML =
            data.totalreservation);
        document.getElementById("booked") != null &&
          (document.getElementById("booked").innerHTML = data.totalbooked);
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
        for (let i = 0; i < data.length; i++) {
          datas.push(data[i].noOfRoom);
        }
        // Bar Chart Example
        var ctx = document.getElementById("barChart");
        var myBarChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Suite", "Deluxe", "Single bed"],
            datasets: [
              {
                label: "Quantity",
                backgroundColor: "#4e73df",
                hoverBackgroundColor: "#2e59d9",
                borderColor: "#4e73df",
                data: datas,
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            layout: {
              padding: {
                left: 10,
                right: 25,
                top: 25,
                bottom: 0,
              },
            },
            scales: {
              xAxes: [
                {
                  time: {
                    unit: "month",
                  },
                  gridLines: {
                    display: false,
                    drawBorder: false,
                  },
                  ticks: {
                    maxTicksLimit: 6,
                  },
                  maxBarThickness: 80,
                },
              ],
              yAxes: [
                {
                  ticks: {
                    min: 0,
                    max: 200,
                    maxTicksLimit: 5,
                    padding: 10,
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                      return number_format(value);
                    },
                  },
                  gridLines: {
                    color: "rgb(234, 236, 244)",
                    zeroLineColor: "rgb(234, 236, 244)",
                    drawBorder: false,
                    borderDash: [2],
                    zeroLineBorderDash: [2],
                  },
                },
              ],
            },
            legend: {
              display: false,
            },
            tooltips: {
              titleMarginBottom: 10,
              titleFontColor: "#6e707e",
              titleFontSize: 14,
              backgroundColor: "rgb(255,255,255)",
              bodyFontColor: "#858796",
              borderColor: "#dddfeb",
              borderWidth: 1,
              xPadding: 15,
              yPadding: 15,
              displayColors: false,
              caretPadding: 10,
              callbacks: {
                label: function (tooltipItem, chart) {
                  var datasetLabel =
                    chart.datasets[tooltipItem.datasetIndex].label || "";
                  return (
                    datasetLabel + ": " + number_format(tooltipItem.yLabel)
                  );
                },
              },
            },
          },
        });
      });
  })();
};

document.getElementById("search").addEventListener("click", function () {
  const id = document.getElementById("reservationID").value;
  if (id != "") {
    (async () => {
      await fetch("http://127.0.0.1:2001/api/reservationsearch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reservationID: id,
        }),
      })
        .then(function (response) {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        });
    })();
  }
});
