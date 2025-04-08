<?php
session_start();
if (!isset($_SESSION['user'])) {
    header("Location: login.html");
    exit;
}
$user = $_SESSION['user'];
?>

<!DOCTYPE html>
<html>
<head>
    <title><?php echo $user['fullname']; ?>'s Profile</title>
</head>
<body>
    <h1>Welcome, <?php echo $user['fullname']; ?></h1>
    <p><?php echo $user['bio']; ?></p>
    <a href="upload_research.php">Upload Research</a> <!-- For uploading research -->
    <a href="logout.php">Logout</a>
</body>
</html>
