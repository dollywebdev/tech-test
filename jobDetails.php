<?php
// Including database connections
require_once 'database_connections.php';
// mysqli query to fetch all data from database
$data = json_decode(file_get_contents("php://input"));
$status = mysqli_real_escape_string($con, $data->job_status);
$query = "SELECT *, s.name AS suburbName, c.name as categoryName,j.id as jobId "
        . "FROM jobs j "
        . "LEFT JOIN suburbs s ON s.id = j.suburb_id "
        . "LEFT JOIN categories c ON c.id = j.category_id "
        . "WHERE j.job_status = '".$status."' "
        . "ORDER BY j.id ASC";

//echo json_encode($query);exit;
//print_r($query);exit;
$result = mysqli_query($con, $query);
$arr = array();
if(mysqli_num_rows($result) != 0) {
while($row = mysqli_fetch_assoc($result)) {
$arr[] = $row;
}
}

// Return json array containing data from the databasecon
echo $json_info = json_encode($arr);
?>