document.getElementById("coupondetails").addEventListener("submit", (e) => {
    e.preventDefault();
    const couponName = e.target[0].value;
    const couponDiscount = e.target[1].value;

    (async () => {
        await fetch("http://127.0.0.1:2001/api/addcoupon", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({coupon: couponName, percentage: couponDiscount})
        })
          .then(function (response) {
            return response.json();//
          })
          .then(function (data) {
           alert(data);
           console.log(data);
        });
      })();
});