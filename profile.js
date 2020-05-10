let text = document.getElementsByTagName("cite"),
  currentUser = localStorage.getItem("currentUser"),
  logOut = document.querySelector(".btn");

console.log(currentUser);
console.log(text);

text[0].textContent = "email: " + currentUser;

logOut.addEventListener("click", function (e) {
  localStorage.removeItem("currentUser");
  document.location.href = "logIn.html";
});