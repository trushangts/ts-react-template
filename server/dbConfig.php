<?php
$dbHost = "localhost";        //Location Of Database usually its localhost
$dbUser = "root";            //Database User Name
$dbPass = "";            //Database Password
$dbDatabase = "reactAPI";       //Database Name


$con = mysqli_connect($dbHost,$dbUser,$dbPass,$dbDatabase);

// Check connection
if (mysqli_connect_errno())
{
echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
