<?php
// Including database connections
require_once 'database_connections.php';
// Fetching the updated data & storin in new variables
$data = json_decode(file_get_contents("php://input"));
// Escaping special characters from updated data
$id = mysqli_real_escape_string($con, $data->id);
$status = mysqli_real_escape_string($con, $data->action);
// mysqli query to insert the updated data
$query = "UPDATE jobs SET job_status='$status' WHERE id=$id";
mysqli_query($con, $query);
echo true;
?>