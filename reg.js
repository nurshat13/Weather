let email = document.getElementById("inputEmail"),
  password = document.getElementById("inputPassword"),
  passwordConfirm = document.getElementById("inputPasswordConfirm"),
  button = document.getElementsByTagName("button")[0];



button.addEventListener("click", function (e) {
  let mail = email.value,
    pass = password.value,
    passConfirm = passwordConfirm.value;
  // console.log(passConfirm);
  if (mail == "" && pass == "") {
    alert("Вы оставили один из полей пустым!");
  } else if (pass.length < 8) {
    alert("Пароль должен содержать не меньше 8-ми символов!");
  } else if (passConfirm != pass) {
    alert("Пароли не совподают!");
  } else {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key == mail) {
        alert("Вы уже зарегистрировыны зайдите на сайт!");
      } else {
        localStorage[mail] = pass;
        document.location.href = "logIn.html";
      }
    }
  }

});