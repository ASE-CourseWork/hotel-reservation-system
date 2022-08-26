/*!
 * Start Bootstrap - Creative v7.0.6 (https://startbootstrap.com/theme/creative)
 * Copyright 2013-2022 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
 */
//
// Scripts
//

window.addEventListener("DOMContentLoaded", (event) => {
  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };

  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener("scroll", navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      offset: 74,
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });

  // Activate SimpleLightbox plugin for portfolio items
  new SimpleLightbox({
    elements: "#portfolio a.portfolio-box",
  });
});
var ariv;
function check() {
  var e = document.getElementById("inputGroupSelect01");
  var t = document.getElementById("agencycode").value;
  let yourDate = new Date();
  var branch = e.options[e.selectedIndex].text;
  var location = window.location.href;
  if (t == "") {
    location == "http://127.0.0.1:5500/Client/Clerk/checkin.html"
      ? (window.location = `../customer/rooms.html?branch=${branch}&a=${
          ariv == undefined ? formatDate(yourDate) : ariv
        }`)
      : (window.location = `./customer/rooms.html?branch=${branch}&a=${
          ariv == undefined ? formatDate(yourDate) : ariv
        }`);
    return;
  }
  location == "http://127.0.0.1:5500/Client/Clerk/checkin.html"
    ? (window.location = `../customer/rooms.html?branch=${branch}&a=${
        ariv == undefined ? formatDate(yourDate) : ariv
      }&c=${t}`)
    : (window.location = `../Client/customer/rooms.html?branch=${branch}&a=${
        ariv == undefined ? formatDate(yourDate) : ariv
      }&c=${t}`);
}
function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  day2 = "" + (d.getDate() + 1);
  return [year, month, day].join("-") + " " + [year, month, day2].join("-");
}
document.addEventListener("DOMContentLoaded", () => {
  $('input[name="arrival"]').daterangepicker(
    {
      opens: "right",
    },
    function (start, end, label) {
      ariv = start.format("YYYY-MM-DD") + " " + end.format("YYYY-MM-DD");
    }
  );
});
