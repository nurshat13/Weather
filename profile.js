let text = document.getElementsByTagName("cite"),
  currentUser = localStorage.getItem("currentUser");

console.log(currentUser);
console.log(text);

text[0].textContent = "email: " + currentUser;