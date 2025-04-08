// Handle login form submission
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const enteredUsername = document.getElementById("username").value.trim();
  const enteredPassword = document.getElementById("password").value;

  // Retrieve users from localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Find user with matching username and password
  const user = users.find(
    (user) =>
      user.username === enteredUsername && user.password === enteredPassword
  );

  if (user) {
    // Set the current user
    localStorage.setItem("currentUser", user.username);
    // Successful login
    window.location.href = "profile.html";
  } else {
    alert("Invalid username or password.");
  }
});
