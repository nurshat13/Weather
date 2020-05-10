let currentUser,
  key, user, isYes = false;
currentUser = localStorage.getItem("currentUser");

if (localStorage.length < 1) {
  alert("Вам нужно зарегистрироваться");
  document.location.href = "regestration.html";
} else if (currentUser === null) {
  alert("Вам нужно войти")
  document.location.href = "logIn.html";
}

for (let i = 0; i < localStorage.length; i++) {
  user = localStorage.key(i);
  if (user == currentUser) {
    isYes = true;
  }
}

if (isYes) {} else {
  alert("Вам нужно зарегистрироваться");
  document.location.href = "regestration.html";
}

let next = document.querySelector(".carousel-control-next"),
  previous = document.querySelector(".carousel-control-prev"),
  images = document.querySelectorAll(".carousel-item"),
  carouseIndicators = document.querySelectorAll("#corItems"),
  h1 = document.querySelectorAll("#cityName"),
  temp = document.querySelectorAll("#temp"),
  mainWeather = document.querySelectorAll("#main"),
  btn = document.querySelectorAll(".btn-primary"),
  info = document.querySelector("#infoNone"),
  name = document.getElementById("name"),
  country = document.getElementById("country"),
  tempInfo = document.getElementById("tempInfo"),
  tempFeels = document.getElementById("tempFeelsLike"),
  descrip = document.getElementById("description"),
  wind_speed = document.getElementById("windSpeed"),
  img = document.getElementById("imgInfo"),
  searhInput = document.querySelector(".form-control"),
  searhButton = document.querySelector(".btn-outline-success"),
  cityImages = document.querySelector(".img-fluid"),
  infoNoneSlide = document.querySelector(".infoNoneSlide"),
  infoNoneIndecetor = document.querySelector("#infoNoneSlide"),
  modalProfile = document.querySelector(".nav-link"),
  closeInfoButton = document.querySelector("#close");

let mainData = {};

const citis = ["Moscow", "London", "New York", "Pekin", "Paris"];

function start() {
  for (let i = 0; i < 5; i++) {
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        citis[i] +
        "&appid=87dffc1b85ab9f31841b19cb7bb862e1"
      )
      .then((response) => response.json())
      .then((data) => {
        h1[i].textContent = data["name"];
        let kelvin = data["main"]["temp"] - 273;
        temp[i].textContent = "Temperature: " + kelvin.toFixed() + " ℃";
        mainWeather[i].textContent = data["weather"][0]["description"];
        mainData[i] = createData(data["name"], data);
      });
  }
}
start();

function newSlide() {
  for (let i = 0; i < carouseIndicators.length; i++) {
    if (
      carouseIndicators[i].classList.contains("active") &&
      images[i].classList.contains("active")
    ) {
      carouseIndicators[i].classList.remove("active");
      images[i].classList.remove("active");
    }
  }

  infoNoneIndecetor.removeAttribute("id");
  infoNoneIndecetor.id = "corItems";
  infoNoneIndecetor.classList.add("active");

  infoNoneSlide.removeAttribute("class");
  infoNoneSlide.classList.add("carousel-item");
  infoNoneSlide.classList.add("active");

  carouseIndicators = document.querySelectorAll("#corItems");

  indecetors(6);

  start();

  detailed();
}

function searchCity() {
  let searchValue = searhInput.value.trim().toLowerCase();
  fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      searchValue +
      "&appid=87dffc1b85ab9f31841b19cb7bb862e1"
    )
    .then((response) => response.json())
    .then((data) => {
      console.log(data, searchValue);
      newSlide();
      h1[5].textContent = data["name"];
      let kelvin = data["main"]["temp"] - 273;
      temp[5].textContent = "Temperature: " + kelvin.toFixed() + " ℃";
      mainWeather[5].textContent = data["weather"][0]["description"];
      mainData[5] = createData(data["name"], data);
      info.id = "info";
      img.src = "img/" + 6 + ".jpg";
      name.textContent = "City Name: " + mainData[5]["name"];
      country.textContent = "Country: " + mainData[5]["country"];
      tempInfo.textContent =
        "Temperature: " + mainData[5]["temp"].toFixed() + " ℃";
      tempFeels.textContent =
        "Feels like: " + mainData[5]["tempFeelsLike"].toFixed() + " ℃";
      descrip.textContent = "Description: " + mainData[5]["description"];
      wind_speed.textContent =
        "Wind speed: " + mainData[5]["windSpeed"].toFixed();
    })
    .catch((err) => {
      alert("Wrong city name!");
      window.location.reload();
    });
}

closeInfoButton.addEventListener("click", function (e) {
  e.stopImmediatePropagation();
  info.id = "infoNone";
});

searhButton.addEventListener("click", function (e) {
  e.stopImmediatePropagation();
  e.preventDefault();
  searchCity();
});

modalProfile.addEventListener("click", function (e) {
  e.stopImmediatePropagation();
  document.location.href = "Profile.html";
});

searhInput.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    e.stopImmediatePropagation();
    searchCity();
  }
});

function createData(objName, data) {
  objName = {
    name: data["name"],
    temp: data["main"]["temp"] - 273,
    tempFeelsLike: data["main"]["feels_like"] - 273,
    description: data["weather"][0]["description"],
    windSpeed: data["wind"]["speed"],
    country: data["sys"]["country"],
  };
  return objName;
}

function setDitailInfo(i) {
  info.id = "info";
  img.src = "img/" + (i + 1) + ".jpg";
  name.textContent = "City Name: " + mainData[i]["name"];
  country.textContent = "Country: " + mainData[i]["country"];
  tempInfo.textContent = "Temperature: " + mainData[i]["temp"].toFixed() + " ℃";
  tempFeels.textContent =
    "Feels like: " + mainData[i]["tempFeelsLike"].toFixed() + " ℃";
  descrip.textContent = "Description: " + mainData[i]["description"];
  wind_speed.textContent = "Wind speed: " + mainData[i]["windSpeed"].toFixed();
}

function detailed() {
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", function (e) {
      setDitailInfo(i);
    });
  }
}
detailed();

let activ = 0;
next.addEventListener("click", function (e) {
  for (let i = 0; i < carouseIndicators.length; i++) {
    if (
      carouseIndicators[i].classList.contains("active") &&
      images[i].classList.contains("active")
    ) {
      carouseIndicators[i].classList.remove("active");
      images[i].classList.remove("active");
    }
  }
  if (activ + 1 === carouseIndicators.length) {
    activ = 0;
  } else {
    activ++;
  }
  setDitailInfo(activ);
  carouseIndicators[activ].classList.add("active");
  images[activ].classList.add("active");
});

previous.addEventListener("click", function (e) {
  for (let i = 0; i < carouseIndicators.length; i++) {
    if (
      carouseIndicators[i].classList.contains("active") &&
      images[i].classList.contains("active")
    ) {
      carouseIndicators[i].classList.remove("active");
      images[i].classList.remove("active");
    }
  }
  if (activ == 0) {
    activ = carouseIndicators.length - 1;
  } else {
    activ--;
  }
  setDitailInfo(activ);
  carouseIndicators[activ].classList.add("active");
  images[activ].classList.add("active");
});

function indecetors(Indecetorslenght) {
  for (let i = 0; i < Indecetorslenght; i++) {
    carouseIndicators[i].addEventListener("click", (e) => {
      activ = i;
      for (let i = 0; i < Indecetorslenght; i++) {
        if (
          carouseIndicators[i].classList.contains("active") &&
          images[i].classList.contains("active")
        ) {
          carouseIndicators[i].classList.remove("active");
          images[i].classList.remove("active");
        }
      }
      setDitailInfo(i);
      carouseIndicators[i].classList.add("active");
      images[i].classList.add("active");
    });
  }
}
indecetors(5);