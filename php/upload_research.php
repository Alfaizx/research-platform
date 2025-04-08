<?php
session_start();
$conn = new mysqli('localhost', 'root', '', 'research_platform');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'];
    $pdfFile = $_FILES['pdf_file']['name'];
    $targetDir = "uploads/";
    $targetFile = $targetDir . basename($pdfFile);
    
    move_uploaded_file($_FILES['pdf_file']['tmp_name'], $targetFile);
    
    $userId = $_SESSION['user']['id'];
    $sql = "INSERT INTO research_articles (user_id, title, pdf_file) VALUES ('$userId', '$title', '$targetFile')";
    
    if ($conn->query($sql) === TRUE) {
        echo "Research uploaded successfully!";
    } else {
        echo "Error: " . $conn->error;
    }
}

$conn->close();
?>

<form method="POST" enctype="multipart/form-data">
    <input type="text" name="title" placeholder="Research Title" required>
    <input type="file" name="pdf_file" accept="application/pdf" required>
    <button type="submit">Upload</button>
</form>
