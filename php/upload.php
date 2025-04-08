<?php
// upload.php
include 'db_connection.php'; // MySQL connection

// Handle file upload
if (isset($_FILES['researchFile'])) {
    $fileName = $_FILES['researchFile']['name'];
    $fileTmp = $_FILES['researchFile']['tmp_name'];
    $destination = 'uploads/' . $fileName;

    // Move the file to the uploads directory
    if (move_uploaded_file($fileTmp, $destination)) {
        // Store file path in the database
        $currentUser = $_SESSION['username']; // Assuming session or POST data
        $query = "UPDATE users SET uploadedResearch = ? WHERE username = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('ss', $destination, $currentUser);
        if ($stmt->execute()) {
            echo "File uploaded successfully!";
        } else {
            echo "Error storing file info.";
        }
    } else {
        echo "File upload failed.";
    }
}
?>
