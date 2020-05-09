let email = document.getElementById("inputEmail"),
  password = document.getElementById("inputPassword"),
  button = document.getElementsByTagName("button")[0];



button.addEventListener("click", function (e) {
  let mail = email.value,
    pass = password.value,
    isLoged = 0;
  if (localStorage.length < 1) {
    alert("Вы не зарегестрированы");
    document.location.href = "regestration.html";
  } else {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key == mail && pass == localStorage.getItem(key)) {
        isLoged = 1;
      }
    }
  }
  if (mail == "" && pass == "") {
    alert("Вы оставили один из полей пустым!");
  } else if (mail.trim() == "" && pass.trim() == "") {
    alert("Вы оставили один из полей пустым!");
  } else if (isLoged == 1) {
    document.location.href = "index.html";
    localStorage['currentUser'] = mail;
  } else {
    alert("Не верный пароль или логин");
  }
});