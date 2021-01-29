<?php


	// example use from browser
	// http://localhost/companydirectory/libs/php/getDepartmentByID.php?id=2
	
	// remove next two lines for production

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	include("config.php");

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];
		
		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}	

	// $_REQUEST used for development / debugging. Remember to cange to $_POST for production

	$query = 'SELECT p.id, p.lastName, p.firstName, p.jobTitle, p.email, d.name as department, l.name as location FROM personnel p LEFT JOIN department d ON (d.id = p.departmentID) LEFT JOIN location l ON (l.id = d.locationID) WHERE d.id IN('. $_REQUEST['depID'] .', '. $_REQUEST['depID2'] .') ORDER BY p.id';
	$query = '
	SELECT 	p.id, 
			p.lastName, 
			p.firstName, 
			p.jobTitle, 
			p.email, 
			d.name as department, 
			l.name as location
	FROM personnel p 
	LEFT JOIN department d ON (d.id = p.departmentID) 
	LEFT JOIN location l ON (l.id = d.locationID) 
	WHERE d.id IN('. $_REQUEST['depID'] .', '. $_REQUEST['depID2'] .', '. $_REQUEST['depID3'] .', '. $_REQUEST['depID4'] .', '. $_REQUEST['depID5'] .', '. $_REQUEST['depID6'] .', '. $_REQUEST['depID7'] .', '. $_REQUEST['depID8'] .', '. $_REQUEST['depID9'] .', '. $_REQUEST['depID10'] .', '. $_REQUEST['depID11'] .', '. $_REQUEST['depID12'] .') 
	ORDER BY ' . $_REQUEST['sort'];
	$result = $conn->query($query);
	
	if (!$result) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}
   
   	$data = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($data, $row);

	}

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $data;

	header('Content-Type: application/json; charset=UTF-8');
	
	mysqli_close($conn);

	echo json_encode($output); 

?>