document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Capture user input
  const fullname = document.getElementById("fullname").value.trim();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  // Retrieve existing users from localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if username already exists
  const userExists = users.some((user) => user.username === username);
  if (userExists) {
    alert("Username already exists. Please choose a different one.");
    return;
  }

  // Create new user object
  const newUser = {
    fullname: fullname,
    username: username,
    email: email,
    password: password,
    bio: "This is a short bio about the user. They are passionate about research and publishing their findings.",
    profilePic: "", // You can allow users to upload a profile pic later
    uploadedResearch: [],
  };

  // Add new user to users array
  users.push(newUser);

  // Store updated users array in localStorage
  localStorage.setItem("users", JSON.stringify(users));

  // Set the current user
  localStorage.setItem("currentUser", username);

  // Redirect to profile page
  window.location.href = "profile.html";
});

// Prepopulate predefined users
function prepopulateUsers() {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  const predefinedUsers = [
    {
      fullname: "Alfaiz Shaikh",
      username: "faiz_xr",
      email: "alfaizs@gmail.com",
      password: "Alfaiz",
      bio: "Founder and Developer of this Platform, Passionate about Research and Development",
      profilePic:
        "https://xrwisdomdata.wordpress.com/wp-content/uploads/2025/01/wp-17375640405747403595944343651552.jpg",
      uploadedResearch: [
        {
          title: "Advanced AI Techniques",
          dataURL: "../doc/AlfaizArticleAI", // Direct link
        },
      ],
    },
    {
      fullname: "Mark Zuckerberg",
      username: "zuck",
      email: "zuck@gmail.com",
      password: "Alfaiz",
      bio: "Founder, Chief Executive Officer and Chairman of META Platforms",
      profilePic:
        "https://xrwisdom.data.blog/wp-content/uploads/2024/10/zuck.jpg",
      uploadedResearch: [
        {
          title: "The High Tech Entrepreneur",
          dataURL: "Articles/The_High_Tech_Entrepreneur.pdf", // Direct link
        },
      ],
    },
    {
      fullname: "Elon Musk",
      username: "elonmusk",
      email: "elon@example.com",
      password: "Alfaiz",
      bio: "Entrepreneur, Businessman, CEO of Tesla and X (Twitter). I'm here to share my journey through Articles",
      profilePic:
        "https://xrwisdom.data.blog/wp-content/uploads/2024/10/elon.jpg",
      uploadedResearch: [
        {
          title: "Future of Digital Transformation",
          dataURL: "Articles/Future_of_Digital_Transformation.pdf", // Direct link
        },
      ],
    },
  ];

  predefinedUsers.forEach((preUser) => {
    const userExists = users.some((user) => user.username === preUser.username);
    if (!userExists) {
      users.push(preUser);
    }
  });

  // Save the updated users list in localStorage
  localStorage.setItem("users", JSON.stringify(users));
}

// Call the prepopulateUsers function on page load
window.onload = function () {
  prepopulateUsers();
};
