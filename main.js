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
  infoNoneIndecetor = document.querySelector("#infoNoneSlide");


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

searhButton.addEventListener("click", function (e) {
  fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      searhInput.value +
      "&appid=87dffc1b85ab9f31841b19cb7bb862e1"
    )
    .then((response) => response.json())
    .then((data) => {
      newSlide();
      // cityImages[i].src = "img/wib.png";
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
      infoNoneIndecetor.removeAttribute("id");
      infoNoneIndecetor.id = "infoNoneSlide";
      infoNoneIndecetor.removeAttribute("class");
      infoNoneSlide.removeAttribute("class");
      infoNoneSlide.classList.add("carousel-item");
      infoNoneSlide.classList.add("infoNoneSlide");
      carouseIndicators[0].classList.add("active");
      images[0].classList.add("active");
      alert("Wrong city name!");
      window.location.reload();
    });
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

function detailed() {
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", function (e) {
      info.id = "info";
      img.src = "img/" + (i + 1) + ".jpg";
      name.textContent = "City Name: " + mainData[i]["name"];
      country.textContent = "Country: " + mainData[i]["country"];
      tempInfo.textContent =
        "Temperature: " + mainData[i]["temp"].toFixed() + " ℃";
      tempFeels.textContent =
        "Feels like: " + mainData[i]["tempFeelsLike"].toFixed() + " ℃";
      descrip.textContent = "Description: " + mainData[i]["description"];
      wind_speed.textContent =
        "Wind speed: " + mainData[i]["windSpeed"].toFixed();
    });
  }
}
detailed();

let activ = 0;
next.addEventListener("click", function (e) {
  images[activ].classList.remove("active");
  carouseIndicators[activ].classList.remove("active");
  if (activ + 1 == carouseIndicators.length) {
    activ = 0;
  } else {
    activ++;
  }
  carouseIndicators[activ].classList.add("active");
  images[activ].classList.add("active");
});

previous.addEventListener("click", function (e) {
  images[activ].classList.remove("active");
  carouseIndicators[activ].classList.remove("active");
  if (activ == 0) {
    activ = carouseIndicators.length - 1;
  } else {
    activ--;
  }
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
      carouseIndicators[i].classList.add("active");
      images[i].classList.add("active");
    });
  }
}
indecetors(5);