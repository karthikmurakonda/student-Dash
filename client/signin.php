<?php
echo "hello";
$servername = "localhost";
$username = "root";
$password = "";
$db = "db";
$table = "users";
$user_username =  $_POST["username"];
$user_password =  $_POST["password"];

$conn = new mysqli($servername, $username, $password);

// check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
  // Create database
$sql = "CREATE DATABASE  IF NOt exists  `$db`";
if ($conn->query($sql) === TRUE) {
	echo "Database created successfully";
} else {
	echo "Error creating database: " . $conn->error;
}
$sql = "USE `$db`";
$conn->query($sql);
$sql = "CREATE TABLE  IF NOT exists  `$table` ( username VARCHAR(30) NOT NULL, password VARCHAR(255) NOT NULL)";
if ($conn->query($sql) === TRUE) {
	echo "Table created successfully";
} else {
	echo "Error creating table: " . $conn->error;
}
echo "hello";
$sql = "SELECT * FROM `$table` WHERE username = '$user_username'";
$result = $conn->query($sql);
echo $conn->error;
    if(password_verify($user_password,$result->fetch_assoc()["password"])){
        echo "true";
    }
    else{
        echo "false";
    }
  

  $conn->close();
?>