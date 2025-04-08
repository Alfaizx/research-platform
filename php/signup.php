<?php
// signup.php
include 'db_connection.php'; // MySQL connection

// Get form data
$fullname = $_POST['fullname'];
$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];

// Check if username exists
$query = "SELECT * FROM users WHERE username = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param('s', $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Username exists
    echo "Username already taken.";
} else {
    // Insert new user
    $insertQuery = "INSERT INTO users (fullname, username, email, password) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($insertQuery);
    $stmt->bind_param('ssss', $fullname, $username, $email, $password);
    if ($stmt->execute()) {
        echo "Signup successful!";
        header("Location: profile.html"); // Redirect after successful signup
    } else {
        echo "Error during signup.";
    }
}
?>
