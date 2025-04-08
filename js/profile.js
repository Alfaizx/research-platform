// Function to load user data from localStorage
function loadUserData() {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    alert("No user logged in. Please log in first.");
    window.location.href = "login.html";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userData = users.find((user) => user.username === currentUser);

  if (userData) {
    document.getElementById("displayName").textContent = userData.fullname;
    document.getElementById(
      "displayUsername"
    ).innerHTML = `<strong>Username:</strong> ${userData.username}`;
    document.getElementById(
      "displayEmail"
    ).innerHTML = `<strong>Email:</strong> ${userData.email}`;
    document.getElementById("profilePic").style.backgroundImage =
      userData.profilePic
        ? `url('${userData.profilePic}')`
        : 'url("default-profile.png")';
    document.getElementById("bioText").textContent =
      userData.bio ||
      "This is a short bio about the user. They are passionate about research and publishing their findings.";

    // Load uploaded research
    const researchList = document.getElementById("researchList");
    const noResearchMessage = document.getElementById("noResearchMessage");
    researchList.innerHTML = ""; // Clear existing list

    if (userData.uploadedResearch && userData.uploadedResearch.length > 0) {
      noResearchMessage.style.display = "none";
      userData.uploadedResearch.forEach((research, index) => {
        const li = document.createElement("li");

        const titleContainer = document.createElement("div");
        const title = document.createElement("span");
        title.className = "article-title";
        title.textContent = `${research.title} by ${userData.fullname}`;

        titleContainer.appendChild(title);

        const downloadLink = document.createElement("a");
        downloadLink.href = research.dataURL;
        downloadLink.className = "download-link";
        downloadLink.download = `${research.title}.pdf`;
        downloadLink.textContent = "Download";

        // Create Delete Button
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("data-index", index);

        li.appendChild(titleContainer);
        li.appendChild(downloadLink);
        li.appendChild(deleteButton);
        researchList.appendChild(li);
      });
    } else {
      noResearchMessage.style.display = "block";
    }
  } else {
    alert("User data not found.");
    window.location.href = "login.html";
  }
}

// Load user data on page load
window.onload = loadUserData;

// Edit Profile Modal Elements
const editModal = document.getElementById("editProfileModal");
const editBtn = document.getElementById("editProfileBtn");
const editSpan = editModal.getElementsByClassName("close")[0];
const editForm = document.getElementById("editProfileForm");

// Profile Picture Upload and Preview
document.getElementById("newProfilePic").addEventListener("change", function (event) {
  const file = event.target.files[0];
  const previewContainer = document.getElementById("profilePicPreview");

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      // Clear previous content and display the image preview
      previewContainer.innerHTML = `<img src="${e.target.result}" alt="Profile Picture" style="max-width: 150px; max-height: 150px; border-radius: 50%;"/>`;
    };

    reader.readAsDataURL(file);
  } else {
    previewContainer.innerHTML = ""; // Clear preview if no file is selected
  }
});

// Open Edit Profile Modal
editBtn.onclick = function () {
  // Pre-fill the form with existing data
  const currentUser = localStorage.getItem("currentUser");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userData = users.find((user) => user.username === currentUser);
  if (userData) {
    document.getElementById("newName").value = userData.fullname;
    document.getElementById("newUsername").value = userData.username;
    document.getElementById("newBio").value = userData.bio || "";

    // Reset the profile picture preview
    const previewContainer = document.getElementById("profilePicPreview");
    if (userData.profilePic) {
      previewContainer.innerHTML = `<img src="${userData.profilePic}" alt="Profile Picture" style="max-width: 150px; max-height: 150px; border-radius: 50%;"/>`;
    } else {
      previewContainer.innerHTML = ""; // Clear preview if no profile picture is set
    }
  }
  editModal.style.display = "block";
};

// Close Edit Profile Modal
editSpan.onclick = function () {
  editModal.style.display = "none";
};

// Close Edit Profile Modal when clicking outside
window.onclick = function (event) {
  if (event.target == editModal) {
    editModal.style.display = "none";
  }
};

// ===============================
// FINAL: Handle Edit Profile Form Submission
// ===============================
editForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Grab values from the form inputs
  const newName = document.getElementById("newName").value.trim();
  const newUsername = document.getElementById("newUsername").value.trim();
  const newBio = document.getElementById("newBio").value.trim();
  const newProfilePicInput = document.getElementById("newProfilePic");

  // Get current user data from localStorage
  const currentUser = localStorage.getItem("currentUser");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userIndex = users.findIndex((user) => user.username === currentUser);

  if (userIndex === -1) {
    alert("User not found.");
    return;
  }

  // This function applies the updated data and saves it to localStorage.
  const updateData = (finalProfilePic) => {
    // Update user object with the new information
    users[userIndex].fullname = newName;
    users[userIndex].username = newUsername;
    users[userIndex].bio = newBio;

    // Update the profile picture only if available
    if (finalProfilePic) {
      users[userIndex].profilePic = finalProfilePic;
    }

    // Save back to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // If the username has changed, update currentUser in localStorage
    if (currentUser !== newUsername) {
      localStorage.setItem("currentUser", newUsername);
    }

    // Refresh the UI with the new data
    loadUserData();
    editModal.style.display = "none";

    // Debug log: shows the updated user data in console
    console.log("✅ Profile updated:", users[userIndex]);
    alert("Profile updated successfully!");
  };

  // Check if a new profile picture was selected  
  if (newProfilePicInput.files && newProfilePicInput.files[0]) {
    const reader = new FileReader();
    
    // When the file is read, call updateData with the base64 string
    reader.onload = function (e) {
      // Debug log: check if the file reading produced a valid base64 string
      console.log("Loaded image data:", e.target.result);
      updateData(e.target.result);
    };
    reader.readAsDataURL(newProfilePicInput.files[0]);
  } else {
    // No new image selected - use the existing profile picture (if any)
    const existingPic = users[userIndex].profilePic || "";
    updateData(existingPic);
  }
});

function updateUserProfile(newName, newUsername, newBio, newProfilePic) {
  const currentUser = localStorage.getItem("currentUser");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userIndex = users.findIndex((user) => user.username === currentUser);

  if (userIndex !== -1) {
    // Update user data
    users[userIndex].fullname = newName;
    users[userIndex].username = newUsername;
    users[userIndex].bio = newBio;
    if (newProfilePic) {
      users[userIndex].profilePic = newProfilePic;
    }

    // Save updated users array back to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Update currentUser if username changed
    if (currentUser !== newUsername) {
      localStorage.setItem("currentUser", newUsername);
    }

    // Update profile display
    loadUserData();

    // Close the modal
    editModal.style.display = "none";
  } else {
    alert("User not found.");
  }
}

// Upload Research Modal Elements
const uploadModal = document.getElementById("uploadResearchModal");
const uploadBtn = document.getElementById("uploadResearchBtn");
const uploadSpan = uploadModal.getElementsByClassName("close")[0];
const uploadForm = document.getElementById("uploadResearchForm");

// Open Upload Research Modal
uploadBtn.onclick = function () {
  uploadModal.style.display = "block";
};

// Close Upload Research Modal
uploadSpan.onclick = function () {
  uploadModal.style.display = "none";
};

// Close Upload Research Modal when clicking outside
window.onclick = function (event) {
  if (event.target == uploadModal) {
    uploadModal.style.display = "none";
  }
};

// Handle Upload Research Form Submission
uploadForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const researchTitle = document.getElementById("researchTitle").value.trim();
  const researchFile = document.getElementById("researchFile").files[0];

  if (!researchFile) {
    alert("Please select a PDF file to upload.");
    return;
  }

  if (researchFile.type !== "application/pdf") {
    alert("Only PDF files are allowed.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const dataURL = event.target.result;

    // Retrieve existing users
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = localStorage.getItem("currentUser");
    const userIndex = users.findIndex((user) => user.username === currentUser);

    if (userIndex !== -1) {
      // Initialize uploadedResearch array if it doesn't exist
      if (!users[userIndex].uploadedResearch) {
        users[userIndex].uploadedResearch = [];
      }

      // Add new research article to the array
      users[userIndex].uploadedResearch.push({
        title: researchTitle,
        dataURL: dataURL,
      });

      // Save updated users array back to localStorage
      localStorage.setItem("users", JSON.stringify(users));

      // Update profile display
      loadUserData();

      // Reset the form
      uploadForm.reset();

      // Close the modal
      uploadModal.style.display = "none";

      alert("Research article uploaded successfully!");
    } else {
      alert("User not found.");
    }
  };

  reader.readAsDataURL(researchFile);
});

// Logout Functionality
document.getElementById("logoutLink").addEventListener("click", function (e) {
  e.preventDefault();
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
});

// Delete Research Function
function deleteResearch(index) {
  const currentUser = localStorage.getItem("currentUser");
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const userIndex = users.findIndex((user) => user.username === currentUser);

  if (userIndex > -1) {
    if (confirm("Are you sure you want to delete this research article?")) {
      users[userIndex].uploadedResearch.splice(index, 1); // Remove the research at index
      localStorage.setItem("users", JSON.stringify(users)); // Update localStorage
      loadUserData(); // Refresh to update the displayed list
      alert("Research article deleted successfully!");
    }
  } else {
    alert("User not found.");
  }
}

// Event delegation for delete buttons
document.getElementById("researchList").addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("delete-button")) {
    const index = e.target.getAttribute("data-index");
    if (confirm("Are you sure you want to delete this research article?")) {
      handleDeleteResearch(index);
    }
  }
});
